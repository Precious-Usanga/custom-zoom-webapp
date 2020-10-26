import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { MeetingService } from '../core/services/meeting.service';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av'); // CDN version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  form: FormGroup;
  joinRole = '';
  payload = {
    meeting_id: 0,
    meeting_pswd: '',
    user_email: '',
    username: '',
    role: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(DOCUMENT) document,
    private meeting: MeetingService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

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

  onSubmit(formPayload) {
    this.payload.meeting_id = Number(formPayload.meeting_id.value),
    this.payload.meeting_pswd = formPayload.meeting_pswd.value,
    this.payload.user_email = formPayload.user_email.value,
    this.payload.username = formPayload.username.value,
    this.payload.role = Number(formPayload.role.value),

    console.log(this.payload);
    this.getUserSignature({meetingNumber: this.payload.meeting_id, role: this.payload.role});
  }

  getUserSignature(payload){
    this.meeting.getSignature(payload).subscribe(
      data => {
        if (data.signature) {
          console.log(data);
          console.log(this.payload);
          this.startMeeting(data, this.payload);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  startMeeting(meetingPayload, UserPayload) {

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

  checkRole(event) {
    console.log(event.target.value);
    if (Number(event.target.value) === 1){
      this.joinRole = 'START MEETING';
    } else if (Number(event.target.value) === 5 || Number(event.target.value) === 0) {
      this.joinRole = 'JOIN MEETING';
    }
  }

  clearFormFields() {
    this.form.reset();
  }
}
