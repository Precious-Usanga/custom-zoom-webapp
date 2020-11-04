import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { MeetingService } from '../core/services/meeting.service';
import { ISignature, IMeeting, IMeetingInit, IMeetingConstants } from '../core/interfaces/signature';
import { environment } from '../../environments/environment';

// ZoomMtg.setZoomJSLib('http://localhost:4200/node_modules/@zoomus/websdk/dist/lib', '/av'); // LOCAL version
// ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av'); // CDN version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  form: FormGroup; // Reative Form name
  joinRole = '';
  payload: IMeeting;
  meetingConstants: IMeetingConstants;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) document,
    private meeting: MeetingService
  ) {}

  ngOnInit(): void {
    this.getMeetingConstants(); // check for meeting constants from URL on pageLoad
    this.initForm(); // initialize reactive form on component init
  }

  // get meeting constant from URL
  getMeetingConstants() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.apiKey !== undefined && params.apiSecret !== undefined) {
          this.meetingConstants = {
            apiKey: params.apiKey,
            apiSecret: params.apiSecret
          };
        } else if (params.apiKey === undefined && params.apiSecret === undefined) {
          console.log('params: ', params);
        }
        console.log('meetingConstans: ', this.meetingConstants);
      }
    );
  }

  // build form controls
  initForm(): void {
    this.form = this.fb.group({
      meeting_id: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      meeting_pswd: [null, Validators.required],
      user_email: ['', Validators.email],
      username: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  get formData() {
    return this.form.controls;
  }

  // method when form is submitted
  onSubmit(formPayload) {
    this.payload = {
                      meeting_id: Number(formPayload.meeting_id.value),
                      meeting_pswd: formPayload.meeting_pswd.value,
                      user_email: formPayload.user_email.value,
                      username: formPayload.username.value,
                      role: Number(formPayload.role.value)
                   };
    if (this.meetingConstants === undefined) {
      // generate signature to start or join meeting via backend server
      // it requires meeting_id and role of user
      this.getUserSignature(
        {meetingNumber: this.payload.meeting_id, role: this.payload.role}
        );
    } else if (this.meetingConstants !== undefined) {
      if (this.meetingConstants.apiKey !== undefined && this.meetingConstants.apiSecret !== undefined) {
        // generate signature to start or join meeting via queryParam
        // it requires apiKey, apiSecret, meeting_id and role of user
        this.generateSignature(
          {
            meetingNumber: this.payload.meeting_id,
            apiKey: this.meetingConstants.apiKey,
            apiSecret: this.meetingConstants.apiSecret,
            role: this.payload.role
          }
        );
      }
    }
  }

  // method to generate signature for meeting from queryParams
  generateSignature(payload: ISignature) {
    let generatedSignature = '';
    ZoomMtg.generateSignature({
      ...payload,
      success: (success) => {
        if (success.status === true && success.result !== '') {
          generatedSignature = success.result;
        }
      }
    });
    const meetingPayload = {
      leaveUrl: environment.leaveUrl,
      apiKey: this.meetingConstants.apiKey,
      signature: generatedSignature
    };
    this.startMeeting(meetingPayload, this.payload);
  }


  // method to generate signature for meeting via http request
  getUserSignature(payload){
    this.meeting.getSignature(payload).subscribe(
      data => {
        if (data.signature) {
          // console.log(data);
          // console.log(this.payload);
          this.startMeeting(data, this.payload);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // method to generate start or join meeting
  startMeeting(meetingPayload: IMeetingInit, UserPayload: IMeeting) {

    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: meetingPayload.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: meetingPayload.signature,
          meetingNumber: UserPayload.meeting_id,
          userName: UserPayload.username,
          apiKey: meetingPayload.apiKey,
          userEmail: UserPayload.user_email,
          passWord: UserPayload.meeting_pswd,
          success: (success) => {
                                  console.log(success);
                                },
          error: (error) => {
                              console.log(error);
                            }
        });

      },
      error: (error) => {
                          console.log(error);
                        }
    });
  }

  // toggle between start or join meeting based on role
  checkRole(event) {
    if (Number(event.target.value) === 1){
      this.joinRole = 'START MEETING';
    } else if (Number(event.target.value) === 5 || Number(event.target.value) === 0) {
      this.joinRole = 'JOIN MEETING';
    }
  }

  //  reset form
  clearFormFields() {
    this.form.reset();
  }
}
