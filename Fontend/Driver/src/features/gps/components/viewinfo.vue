<template lang="pug">
  v-card.my-profile-address(tile)
    v-toolbar(card dark color="primary")
      v-btn(icon @click.native="isActive = false" dark)
        v-icon close
      v-toolbar-title Thông tin khách hàng
      v-spacer
      v-toolbar-items
        v-btn(dark flat @click.native="save()") Nhận
      v-menu(bottom right offset-y)
        v-btn(slot="activator" dark icon)
          v-icon more_vert
        v-list

    v-card-text(style="position: relative; max-width: 500px; margin: auto;")
      loading(:loading="loading" :oops="oops")

      v-flex(d-flex xs12)
        v-layout(column)
          v-flex(d-flex)
            v-card
              v-card-text
                v-layout
                  v-flex
                    img.app-avatar(src="../../../assets/images/profile.jpg")
                  v-flex.px-2
                    h2 {{ requestInfo.Fullname }}
          v-flex(d-flex)
            v-card(flat)
              v-card-title
                .title Thông tin chi tiết
              v-card-text
                v-layout(row wrap style="align-items: center;")
                  v-flex(d-flex xs12 sm12 md6)
                    | Địa chỉ
                  v-flex(dflex xs12 sm12 md6)
                    v-layout(style="align-items: center;")
                      v-flex.text-xs-left(md6) {{ requestInfo.Address }}
                  v-flex(d-flex xs12 sm12 md6)
                    | Số điện thoại
                  v-flex(dflex xs12 sm12 md6)
                    v-layout(style="align-items: center;")
                      v-flex.text-xs-left(md6) {{ requestInfo.PhoneNumber }}
              v-card-text
                v-layout(row wrap style="align-items: center;")
                  v-flex(d-flex xs12 sm12 md6)
                    | Ghi chú
                  v-flex(dflex xs12 sm12 md6)
                    v-layout(style="align-items: center;")
                      v-flex.text-xs-left(md6) {{ requestInfo.Note }}

</template>

<script>
import store from '@/store'
export default {
  name: 'Profile',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loading: false,
      showPage: false,
      oops: false,
      valid: false,
      countries: null,

      requestInfo: {
        RequestID: 0,
        Fullname: '',
        PhoneNumber: '',
        Address: '',
        Note: '',
        Username: '',
        formattedAddress: '',
        Latitude: '',
        Longitude: ''
      } /* ,

      rules: {
        addressLine1: [(v) => !!v || 'Address Line 1 is required'],
        state: [(v) => !!v || 'State/Region is required'],
        country: [(v) => !!v || 'Country is required'],
        zipcode: [(v) => !!v || 'Zipcode is required']
      } */
    }
  },

  computed: {
    isActive: {
      get () {
        return this.active
      },
      set (val) {
        this.$emit('update:active', val)
      }
    }
  },

  watch: {
    active (val) {
      // if (val) this.refreshData()
    }
  },

  mounted () {
    this.refreshData()
  },
  created () {
  },
  methods: {
    save () {
      this.isActive = true
      this.requestInfo.Status = 1
    },

    refreshData () {
      // this.loading = true
      this.oops = false
      this.showPage = true
      this.requestInfo = store.state.auth.requestInfo
      this.loading = false
      /* this.$options.service.getProfile()
        .then((data) => {
          this.profile = data
          this.showPage = true
          this.loading = false
        })
        .catch((error) => {
          this.$store.dispatch('common/errorDialog', 'Error: ' + error.message)
          this.oops = true
          this.loading = false
        }) */
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-profile-address
  height: 100%
</style>
