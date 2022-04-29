<template>
  <v-list>
    <v-list-group prepend-icon="mdi-account-multiple">
      <template v-slot:activator>
        <v-list-item-title class="type_title">Members <v-divider class="type_divider"></v-divider></v-list-item-title>
      </template>
      <div class="types_block">
        <v-list-item v-if="canAdd">
          <v-btn dense small class="success mx-0 mt-3 add_type_btn" @click="dialog = true">
            <v-icon> mdi-plus </v-icon>
            Add Member
          </v-btn>
        </v-list-item>
        <v-list-item v-for="member in allMembers" :key="member.id">
          <span>{{ member.FullName }}</span>
        </v-list-item>
      </div>
    </v-list-group>
    <v-dialog v-model="dialog" @click:outside="reset">
      <v-card flat>
        <v-card-title>
          <span class="headline">Add Members</span>
        </v-card-title>
        <v-card-text>
          <v-alert dense outlined type="error" icon="mdi-close-circle-outline" v-if="error">{{ errorMessage }}</v-alert>
          <v-row>
            <v-col cols="10">
              <v-text-field label="Member Email" v-model="userEmail"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn :loading="loading" color="primary" @click="SearchForUser"> Add Member</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <template v-for="member in members">
                <v-chip @click:close="removeMember(member)" close :color="randomColor()" :key="member.id"
                  >{{ member.first_name }} {{ member.last_name }}</v-chip
                >
              </template>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-btn color="primary" @click="AddMembers" :loading="loading2">Add Members</v-btn>
              <v-btn class="cancel" @click="reset" outlined>Cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['Project', 'User']),
  },

  created() {
    this.fetchMembers()
    this.CanAdd()
  },

  data() {
    return {
      dialog: false,
      is_you: '',
      allMembers: [],
      members: [],
      membersIDs: [],
      errorMessage: '',
      userEmail: '',
      error: false,
      loading: false,
      loading2: false,
      canAdd: false,
    }
  },

  methods: {
    ...mapActions(['fetchUser', 'fetchUserByEmail', 'addProjectMembers']),

    async fetchMembers() {
      this.allMembers = []
      this.Project.members.forEach(async member => {
        var user = await this.fetchUser(member)
        user = user[0]
        var Name = ''

        if (user.id == this.User.id && user.id == this.Project.admin)
          Name = user.first_name + ' ' + user.last_name + ' (You) (Admin)'
        else if (user.id == this.User.id) Name = user.first_name + ' ' + user.last_name + ' (You)'
        else if (user.id == this.Project.admin) Name = user.first_name + ' ' + user.last_name + ' (Admin)'
        else Name = user.first_name + ' ' + user.last_name
        this.allMembers.push({
          id: user.id,
          FullName: Name,
        })
      })
    },

    removeMember(member) {
      this.members = this.members.filter(m => m.id !== member.id)
    },

    async SearchForUser() {
      this.loading = true
      this.searchResult = await this.fetchUserByEmail(this.userEmail.toLowerCase())
      this.searchResult = this.searchResult[0]
      if (this.searchResult === undefined) {
        this.errorMessage = 'User not found'
        this.error = true
      } else {
        if (Boolean(this.members.find(member => member.id == this.searchResult.id))) {
          this.errorMessage = 'User already added'
          this.error = true
        } else {
          this.members.push(this.searchResult)
        }
      }
      this.loading = false
    },

    randomColor() {
      return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)'
    },

    CanAdd() {
      this.canAdd = this.User.id == this.Project.admin
    },

    async AddMembers() {
      this.loading2 = true
      this.members.forEach(member => {
        this.membersIDs.push(member.id)
      })

      await this.addProjectMembers({ project_id: this.Project.id, _members: this.membersIDs })
      this.fetchMembers()
      this.loading2 = false
      this.dialog = false
      this.reset()
    },

    reset() {
      this.userEmail = ''
      this.members = []
      this.membersIDs = []
      this.dialog = false
    },
  },
}
</script>

<style>
.type_title {
  margin-top: 5px;
}
.type_divider {
  border-width: 1px !important;
  margin-left: 100px;
  width: 92%;
  margin-top: -10px;
}
.types_block {
  margin-left: 36px;
}

.cancel {
  left: 10px;
}
</style>
