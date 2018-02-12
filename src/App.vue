<template>
  <div id="app">
    <v-app>
        <v-content>
          <v-container grid-list-md>
            <h1>{{ msg }}</h1>
            <v-layout row wrap>

              <v-flex offset-lg3 lg6 offset-xs2 xs8>
                  <v-text-field
                    v-model="title"
                    label="Enter your note here"
                    clearable
                    rows="1"
                    textarea
                    hide-details
                  ></v-text-field>
                <v-text-field
                  v-show="ex4"
                  v-model="details"
                  label="Details"
                  rows="2"
                  clearable
                  textarea
                  hide-details
                ></v-text-field>
                <v-checkbox class="pa-0" label="Add details" v-model="ex4" color="primary" hide-details></v-checkbox>
                  <v-card-text style=" position: relative" class="mt-3 ml-5">
                    <v-btn
                      v-on:click="createNote()"
                      absolute
                      dark
                      fab
                      top
                      right
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-card-text>


              </v-flex>

              <v-flex xs12 lg6>
                <v-card class="elevation-10">
                  <v-card class="elevation-4" color="grey lighten-2">
                    <v-card-text class="headline">Pending</v-card-text>
                  </v-card>

                  <v-expansion-panel popout expand>
                    <v-expansion-panel-content class="ma-1" v-for="note in noteList" v-bind:key="note.id" v-show="!note.completed">
                      <div slot="header">{{ note.title }}</div>
                      <v-card>
                        <v-card-text class="grey lighten-3" v-show="note.details !== '' ">
                          {{ note.details }}
                        </v-card-text>
                      <v-layout row>
                            <v-btn block outline class="ml-1 mb-0 mt-0 mr-0"  color="amber accent-3" @click="completeNote(note)">In progress</v-btn>
                            <v-btn block outline class="ml-0 mb-0 mt-0 mr-1"  color="error" @click="deleteNote(note)">Delete</v-btn>
                      </v-layout>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                    <v-card-text v-if="!noteList.filter(note => {return note.completed === false}).length">
                      Add a new note through the input above. Don't make me sad ^_^
                    </v-card-text>

                </v-card>
              </v-flex>
              <v-flex xs12 lg6>
                  <v-card class="elevation-4" color="success"> <!-- green lighten-2 -->
                    <v-card-text  class="headline">Completed</v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                  <v-expansion-panel inset expand v-for="note in noteList" v-bind:key="note.id" v-show="note.completed">
                    <v-expansion-panel-content class="ma-1 elevation-1">
                      <div slot="header">{{ note.title }}</div>
                      <v-card>
                        <v-card-text class="grey lighten-3 ma-0" v-show="note.details !== '' ">
                          {{ note.details }}
                        </v-card-text>
                        <v-btn block outline class="ma-0" color="success" @click="incompleteNote(note)">Make it undone</v-btn>
                      </v-card>
                    </v-expansion-panel-content>
                    <v-btn
                      @click="deleteNote(note)"
                      style="margin-right:-15px; position: relative" class="ml-0 mb-0 mt-0"
                      small dark icon right top color="red">
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </v-expansion-panel>

                <v-card>
                  <v-card-text v-if="!noteList.filter(note => {return note.completed === true}).length">
                    There is no any completed To-Do's in your list. Finish them or add, and then complete.
                  </v-card-text></v-card>
              </v-flex>

                <v-progress-linear
                  v-if="noteList.length"
                  v-bind:value="`${noteList.filter(note => {return note.completed === true}).length}`*100/`${noteList.length}`"
                  height="5"
                  color="success"
                  background-color="grey lighten-2" ></v-progress-linear>
                <v-progress-linear v-else v-bind:indeterminate="true" height="5" color="success" background-color="grey lighten-2" ></v-progress-linear>

            </v-layout>
          </v-container>
        </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      noteList: [{
        title: 'Do something!',
        details: 'Nothing to say, but I did it',
        completed: false,
      }, {
        title: 'Read the first note',
        details: '',
        completed: false,
      }, {
        title: 'Let\'s imagine this isn\'t the first time you read this To-Do',
        details: 'r3@dme#$WVG',
        completed: true,
      }],
      title: '',
      details: '',
      ex4: false,
      msg: 'To-Do List with Vuetify',
    }
  },
  methods: {
    completeNote(note) {
      const index = this.noteList.indexOf(note);
      this.noteList[index].completed = true;
    },
    incompleteNote(note) {
      const index = this.noteList.indexOf(note);
      this.noteList[index].completed = false;
    },
    deleteNote(note) {
      const index = this.noteList.indexOf(note);
      this.noteList.splice(index, 1);
    },
    createNote() {
      if (this.ex4)
      {
        if (this.title.length > 0 && this.details.length > 0) {
          const title = this.title;
          const details = this.details;
          this.noteList.push({
            title,
            details,
            completed: false,
          });
          this.title = '';
          this.details = '';
        }
      }
      else {
        if (this.title.length > 0) {
          const title = this.title;
          const details = '';
          this.noteList.push({
            title,
            details,
            completed: false,
          });
          this.title = '';
          this.details = '';
        }
      }
    },
  },
}

</script>

<style>
#app {
  font-family: 'Century Gothic', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
