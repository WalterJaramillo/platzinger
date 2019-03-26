import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friends = [
      {nick: 'Eduardo', subnick: 'Mi mensaje personal', status: 'online', age: 28, email: 'eduardo@platzi.com', friend: true, uid: 1},
      {nick: 'Yuliana', subnick: 'Mi mensaje personal', status: 'busy', age: 25, email: 'yuliana@platzi.com', friend: true, uid: 2},
      {nick: 'Freddy', subnick: 'Mi mensaje personal', status: 'away', age: 28, email: 'freddy@platzi.com', friend: false, uid: 3}, 
      {nick: 'Walter', subnick: 'Mi mensaje personal', status: 'online', age: 30, email: 'walter@platzi.com', friend: false, uid: 4},
      {nick: 'Virginia', subnick: 'Mi mensaje personal', status: 'online', age: 30, email: 'virginia@platzi.com', friend: false, uid: 5}
    ]
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
    });
    console.log(this.friend);
   }

  ngOnInit() {
  }

}
