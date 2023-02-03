import axios from 'axios';
import {Logger} from '../../../libs/logs/logger';
import {Service} from 'typedi';
import {UserPosts, UserObject, UserPost} from '../models/user';

@Service()
export class userInfoSvc {
  constructor() {}

  async userInfoExecuter(): Promise<Array<UserObject>> {
    try {
      const userPostResponseList: UserPosts | undefined = await axios.get('https://gorest.co.in/public/v2/posts');
      // FIXME: I get a error. the fix I found does not seem to work
      // https://stackoverflow.com/questions/58149453/type-user-undefined-is-not-assignable-to-type-user
      // const userPostResponseList: UserPosts | undefined = await axios.get('https://gorest.co.in/public/v2/posts');
      // @ts-ignore
      return Promise.resolve(userPostResponseList.data);
    } catch (error) {
      Logger.error('Service: userInfoExecuter', 'errorInfo:' + JSON.stringify(error));
      return Promise.reject(error);
    }
  }

  async userInfoExecuterById(userId?: any): Promise<UserObject> {
    try {
      const userPostResponse: UserPost | undefined = await axios.get(`https://gorest.co.in/public/v2/posts/${userId}`);
      // FIXME: I get a error. the fix I found does not seem to work
      // https://stackoverflow.com/questions/58149453/type-user-undefined-is-not-assignable-to-type-user
      // const userPostResponseList: UserPosts | undefined = await axios.get('https://gorest.co.in/public/v2/posts');
      // @ts-ignore
      return Promise.resolve(userPostResponse.data);
    } catch (error) {
      Logger.error('Service: userInfoExecuterById', 'errorInfo:', +JSON.stringify(error));
      return Promise.reject(error);
    }
  }
}
