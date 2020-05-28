import { Controller } from 'stimulus'
import Tribute from 'tributejs'
import Trix from "trix"


export default class extends Controller {
  static targets = [ "field" ]

  connect() {
    this.editor = this.fieldTarget.editor
    this.initializeTribute()
  }

  disconnect(){
    this.tribute.detach(this.fieldTarget)
  }
  initializeTribute(){
    this.tribute = new Tribute({
      allowSpaces: true,
      lookup: 'name',
      values: this.fetchUsers,
    })
    this.tribute.attach(this.fieldTarget)
  }
  fetchUsers(text,callback){
    fetch(`/mentions.json?query=${text}`)
     .then(response => response.json())
     .then(users => callback(users))
     .catch(error => callback([]))
  }
}
