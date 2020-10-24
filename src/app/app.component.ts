import { Component , OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { DOCUMENT } from '@angular/common';
// import { ZoomMtg } from '@zoomus/websdk';

// ZoomMtg.setZoomJSLib('http://localhost:4200/node_modules/@zoomus/websdk/dist/lib', '/av');
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'custom-zoom-webapp';

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  // signatureEndpoint = 'https://custom-zoom-webapp.herokuapp.com/';
  // apiKey = '9AsIgkT3TIekJfpRAnsP_g';
  // meetingNumber = 82078357900;
  // role = 0;
  // leaveUrl = 'http://localhost:4200';
  // userName = 'Precious';
  // userEmail = 'precioususanga001@gmail.com';
  // passWord = '6zejry';

  constructor(private router: Router,
              // public httpClient: HttpClient,
              // @Inject(DOCUMENT) document
              ) {}

  ngOnInit() {}

  // getSignature() {
  //   this.httpClient.post(this.signatureEndpoint, {
	//     meetingNumber: this.meetingNumber,
	//     role: this.role
  //   }).toPromise().then((data: any) => {
  //     if (data.signature) {
  //       console.log(data.signature);
  //       this.startMeeting(data.signature);
  //     } else {
  //       console.log(data);
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // startMeeting(signature) {

  //   document.getElementById('zmmtg-root').style.display = 'block';

  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     success: (success) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         apiKey: this.apiKey,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         }
  //       });

  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }
}
