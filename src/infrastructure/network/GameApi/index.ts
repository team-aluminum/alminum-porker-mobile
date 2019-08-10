import ApiClient from "../../../util/ApiClient";

const gameApiEndpoint: string = 'https://aluminum-poker.herokuapp.com';

export default class GameApi {
  userCode: string;
  api: ApiClient;

  constructor(userCode: string) {
    this.userCode = userCode;
    this.api = new ApiClient(gameApiEndpoint);
  }

  sendMobileUser() {
    return this.api.post('/mobile_events/mobile_user', {
      params: {
        user_code: this.userCode,
      },
    });
  }

  sendReadCard(card: string) {
    return this.api.post('/mobile_events/read_card', {
      params: {
        user_code: this.userCode,
        card,
      },
    });
  }

  getStatus() {
    return this.api.get('/mobile_events/mobile_user', {
      params: {
        user_code: this.userCode,
      },
    });
  }

  sendAction(type: string, amount?: number) {
    return this.api.post('/mobile_events/action', {
      params: {
        user_code: this.userCode,
        type,
        amount,
      },
    });
  }

}
