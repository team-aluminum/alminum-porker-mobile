import ApiClient from "../../../util/ApiClient";

const gameApiEndpoint: string = 'http://localhost';

export default class GameApi {
  playerId: string;

  constructor(playerId: string) {
    this.playerId = playerId;
  }

  sendTakeCard(cardId: string) {
    const api = new ApiClient(gameApiEndpoint);
    api.post('post', {params: {
        cardId,
      }})
      .then((resp): void => {
        console.log(resp);
      })
      .catch((err): void => {
        console.log(err);
      })
  }
}
