class Api {
    constructor({address, token, cohort}) {
        this._address = address;
        this._token = token;
        this._cohort = cohort;
    }

    handleResponse (res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    }
  
    getInitialCards() {
        return fetch(`${this._address}/${this._cohort}/cards`, 
        {
            headers: {
              authorization: this._token
            }
        })
        .then((res) =>
            this.handleResponse(res)
        )
    };

    addCard(data) {
      return fetch(`${this._address}/${this._cohort}/cards`, {
          method: 'POST',
          headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: data.name,
              link: data.link
          }),
      })
      .then((res) =>
          this.handleResponse(res)
      )
    }

    deleteCard(card) {
      return fetch(`${this._address}/${this._cohort}/cards/${card}`, {
          method: 'DELETE',
          headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
          }
      })
      .then((res) =>
          this.handleResponse(res)
      )
    }

    getUserInfo() {
      return fetch(`${this._address}/${this._cohort}/users/me`, 
      {
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
      })
      .then((res) =>
          this.handleResponse(res)
      )
    }
    
    setUserInfo(data) {
      return fetch(`${this._address}/${this._cohort}/users/me`, 
      {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then((res) =>
          this.handleResponse(res)
      )
    }

    setUserAva(data) {
      return fetch(`${this._address}/${this._cohort}/users/me/avatar`, 
      {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then((res) =>
          this.handleResponse(res)
      )
    }

    changeLikeCardStatus(card, isLiked) {
      if (isLiked) {
          return fetch(`${this._address}/${this._cohort}/cards/likes/${card._id}`, 
          {
              method: 'PUT',
              headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
              }
          })
          .then((res) =>
              this.handleResponse(res)
          )
      } else {
          return fetch(`${this._address}/${this._cohort}/cards/likes/${card._id}`, 
          {
              method: 'DELETE',
              headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
              }
          })
          .then((res) =>
              this.handleResponse(res)
          )
      }
    }
}

export const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'faff6938-14cd-479b-b073-d27fe856bd16',
  cohort: 'cohort-17'
});
