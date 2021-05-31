<template>
  <div class="home">
    <b-alert :show="alertCountdown" dismissible fade :variant="alertType" @dismiss-count-down="countDownChanged" >
      {{alertText}}
    </b-alert>
    <div>
      <div class="text-center >text-danger my-2" v-if="isLoading">
        <b-spinner class="align-middle"></b-spinner>
      </div>
      <div class="row mt-3 messages-box" v-if="!isLoading">
        <div class="col-lg-12 col-md-12 col-sm-12" v-for="(message, index) in messages" :key="index">
          <b-media tag="li" :class="{'media-left': message.source == 'users', 'media-right': message.source == 'me'}">
            <b-list-group-item :variant="message.source == 'users' ? 'light' : 'primary'" class="d-flex align-items-center pt-3 pb-3">
              <b-avatar :class="{'mr-3': message.source == 'users', 'ml-3': message.source == 'me'}" size="2rem" variant="light">
                <i class="fa fa-user" style="color: #908182; font-size:1.4rem"></i>
              </b-avatar>
              <span class=" username" :class="{'mr-auto': message.source == 'users', 'ml-auto': message.source == 'me'}" ><h6>{{message.sender}}</h6></span>
              <p>
                {{message.message}}
              </p>
              <b-dropdown size="sm" right variant="link" class="messageOptionsMenu" toggle-class="text-decoration-none" no-caret v-if="message.source == 'me'">
                <template #button-content>
                  <i class="fa fa-angle-down"></i>
                </template>
                <b-dropdown-item @click="openEditMessageModal(message, index)">Edit</b-dropdown-item>
                <b-dropdown-item @click="openDeleteMessageModal(index)">Delete</b-dropdown-item>
              </b-dropdown>
            </b-list-group-item>
            <br>
          </b-media>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
          <div id="bottomOfMessages"></div>
        </div>
      </div>
    </div>
    <b-modal v-model="editMessageModal" title="Edit message" size="lg">
      <b-form-textarea
        autofocus
        rows="5"
        ref="editMessageTextbox"
        id="textarea-default"
        v-model="editMessage.message"
        placeholder="Edit the message."
      ></b-form-textarea>
      <template v-slot:modal-footer>
        <b-button size="sm" variant="secondary" @click="editMessageModal = false">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="callEditMessage()">
          Save
        </b-button>
      </template>
    </b-modal>
    <b-modal v-model="deleteMessageModal">
      <p class="my-4">Delete this message?</p>
      <template v-slot:modal-footer>
        <b-button size="sm" variant="secondary" @click="deleteMessageModal = false">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="callDeleteMessage()">
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
  
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        isLoading: false,
        messages: [
          {
            id: 1,
            sender: "user #1",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            source: "users"
          },
          {
            id: 2,
            sender: "user #6",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus aut voluptates quo vitae ipsa sunt repudiandae molestias in minima, quos ipsum voluptate recusandae reiciendis praesentium alias! Sed, error repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus aut voluptates quo vitae ipsa sunt repudiandae molestias in minima, quos ipsum voluptate recusandae reiciendis praesentium alias! Sed, error repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus aut voluptates quo vitae ipsa sunt repudiandae molestias in minima, quos ipsum voluptate recusandae reiciendis praesentium alias! Sed, error repudiandae.",
            source: "users"
          },
          {
            id: 3,
            sender: "Me",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus aut voluptates quo vitae ipsa sunt repudiandae molestias in minima.",
            source: "me"
          },
          {
            id: 4,
            sender: "user #6",
            message: "Lorem ipsum dolor sit amet consectetur ",
            source: "users"
          },
        ],
        alertCountdown: 0,
        alertType: '',
        alertText: '',
        lastId: 4,
        editMessageModal: false,
        editMessage: {
          index: null,
          message: ""
        },
        deleteMessageModal: false,
        deleteMessageIndex: null
      }
    },
    mounted() {
      this.bus.$on('submit', this.submit)
    }, 
    methods: {
      addMessage(messagge) {
        this.messages.push({
          'id': ++this.lastId,
          'sender': "Me",
          'message': messagge,
          'source': "me"
        })
        var scrollToLMyMessage = setInterval(() => {
          this.scrollToBottom();
          clearInterval(scrollToLMyMessage);
        }, 0);

      },
      openEditMessageModal(message, index) {
        this.editMessage = {
          index,
          message: message.message
        };
        this.editMessageModal = true;
      },
      callEditMessage() {
        var indexOfMessage = this.editMessage.index;
        var newMesage = this.editMessage.message;
        this.messages[indexOfMessage].message = newMesage;
        this.editMessageModal = false;
        this.alertType = "success"
        this.alertText = "Message has been edited successfully."
        this.alertCountdown = process.env.VUE_APP_ALERT_COUNTDOWN;
      },
      openDeleteMessageModal(index) {
        this.deleteMessageIndex = index;
        this.deleteMessageModal = true;
      },
      callDeleteMessage() {
        this.messages.splice(this.deleteMessageIndex, 1);
        this.deleteMessageModal = false;
        this.alertType = "success"
        this.alertText = "Message has been deleted successfully."
        this.alertCountdown = process.env.VUE_APP_ALERT_COUNTDOWN;
      },
      countDownChanged(alertCountdown) {
        this.alertCountdown = alertCountdown
      },
      scrollToBottom() {
        var items = document.querySelectorAll(".media");
        var last = items[items.length-1];
        last.scrollIntoView();
      }
    },
    mounted() {
      this.scrollToBottom();
    }
  }
</script>

<style scoped>
  .alert{
    position: absolute !important;
    top: 92px !important;
    right: 35% !important;
    width: 400px !important;
    z-index: 100 !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .media{
    width: 75%;
  }
  .messages-box{
    margin-bottom: 20px;
    height: 65vh;
    overflow-x: auto;
  }
  .media-right{
    float: right;
    direction: rtl;
    text-align: right;
  }
  .username{
    width: 15%;
  }
  p{
    width: 100%;
    text-align: justify;
    text-justify: inter-word;
  }
  .media-right p{
    padding-left: 25px;
  }
  .messageOptionsMenu{
    top: 0;
    position: absolute;
    left: 0;
  }
</style>
