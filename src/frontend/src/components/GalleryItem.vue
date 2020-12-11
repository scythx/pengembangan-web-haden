<template>
  <v-hover>
    <template
      v-slot:default="{ hover }">
      <v-img
        contain
        class="grey lighten-2"
        :src="url"">
        <v-fade-transition>
          <v-overlay
            absolute
            v-if="hover"
            color="#000000" >
            <div>
              <v-btn
                @click="$emit('click-image')">
                <v-icon
                  dark>
                    mdi-fullscreen
                </v-icon>
              </v-btn>
              <v-btn
                @click="writeUrlToClipboard">
                <v-icon
                  dark>
                    mdi-content-copy
                </v-icon>
              </v-btn>
              <v-btn
                @click="$emit('delete-image')">
                <v-icon
                  color="error">
                    mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-img>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: 'GalleryItem',
  props: ['name', 'url'],
  data: () => ({overlay: false}),
  methods: {
    writeUrlToClipboard() {
      navigator.clipboard.writeText(this.url)
    }
  }
}
</script>
