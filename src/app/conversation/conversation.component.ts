import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  public imagePath: any;
  imageToUpload: any = '';
  imagenes = new Array<any>();
  urls = new Array<string>();
  picture: any = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
      this.friendId = this.activatedRoute.snapshot.params['uid'];
      

      this.authenticationService.getStatus().subscribe((session)=> {
        this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
          this.user = user;

          this.userService.getUserById(this.friendId).valueChanges().subscribe( (data: User) => {
            
            this.friend = data;

            const ids = [this.user.uid, this.friend.uid].sort();
            this.conversation_id = ids.join('|');
            this.getConversation();
          }, (err) => {
            console.log(err);
          });

        });
      });
   }

  ngOnInit() {
  }

  sendMessage() {
    if (this.textMessage !== '') {
        const message = {
          uid: this.conversation_id,
          timestamp: Date.now(),
          text: this.textMessage,
          sender: this.user.uid,
          receiver: this.friend.uid,
          type: 'text'
        }
        this.conversationService.createConversation(message).then( (data)=> {
          this.textMessage = '';
          if (this.urls.length > 0) {
            this.sendImage();
          }
        }).catch( (err)=> { 
          console.log(err); 
        });
      }

    }

  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    }
    this.conversationService.createConversation(message).then( (data)=> {}).catch( (err)=> { 
      console.log(err); 
    });

    this.doZumbido();
  }

  sendImage() {
    const currentPictureId = Date.now();
    //console.log(this.imagenes[0]);
    console.log(`ID: ${currentPictureId}`);
   
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.imagenes[0], 'data_url');

    pictures.then( (result)=> {
      this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      console.log(this.picture);
      
      this.picture.subscribe( (p) => {
        
        const message = {
          uid: this.conversation_id,
          timestamp: Date.now(),
          text: p,
          sender: this.user.uid,
          receiver: this.friend.uid,
          type: 'image'
        }
        
        this.conversationService.createConversation(message).then( (data)=> {
          this.textMessage = '';
          this.urls = [];
        }).catch( (err)=> { 
          console.log(err); 
        });
      });
    }).catch((err)=> {
      console.log(err);
    })

  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(()=> {
      this.shake = false;
    }, 1000);
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data)=> {
      console.log(data);
      this.conversation = data;
      this.conversation.forEach( (message)=> {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type == 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type == 'zumbido') {
            this.doZumbido();
          }
        }
      });
    }, (err)=> {
      console.log(err);
    });
  }

  getUserById(id) {
    if (id === this.friendId) {
      return this.friend;
    } else {
      return this.user;
    }
  }

  preview(event) {
    this.urls = [];
    let files = event.target.files;
    
    if (files) {
      for (let file of files) {
        
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenes.push(reader.result);
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }



}
