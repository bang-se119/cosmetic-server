import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    const users = [
      {
        uid: 'user-1',
        username: 'bang_rogers',
        fullname: 'Dang Duy Bang',
        email: 'bangduy.se119@gmail.com',
        date_of_birth: '26/12/2001',
      },
      {
        uid: 'user-2',
        username: 'thuy_tacy',
        fullname: 'Dinh Thi Minh Thuy',
        email: 'minhthuy2k29@gmail.com',
        date_of_birth: '29/11/2000',
      },
    ];
    return users;
  }
}
