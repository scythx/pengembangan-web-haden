<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          class="my-btn-upload">
          <v-icon
            dark>
            mdi-upload
          </v-icon>
          <input
            type="file"
            accept="image/*"
            class="position-absolute"
            @change="onUploadInput">
        </v-btn>
        <v-btn
          relative
          @click="getItems">
          <v-icon
            dark>
            mdi-autorenew
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="d-flex child-flex"
        cols="3"
        v-for="(item, index) in items" :key="index">
        <GalleryItem
          :name="item['name']"
          :url="item['url']"
          style="height: 200px;"
          @click-image="onImageClick(item)"
          @delete-image="deleteItem(item)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from '@/http'
import GalleryItem from '@/components/GalleryItem'

export default {
  name: 'Gallery',
  components: {GalleryItem},
  data () {
    return {
      items: [{"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"},
              {"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"},
              {"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"},
              {"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"},
              {"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"}]
    }
  },
  methods: {
    onUploadInput(event) {
      [...event.target.files].map((image) => {
        http.post('/images', {
          'name': image.name
        })
        .then((response) => {
          return image
            .arrayBuffer()
            .then((buffer) => {
              return http.put(`/images/${response.data['id']}`, buffer, {
                'headers': {'Content-Type': image.type}
              })
            })
        })
        .then((response) => {

        })
      })
    },
    getItems () {
      http
        .get('/images')
        .then((response) => {
          this.items = response['data']
        })
    },
    deleteItem(item) {
      http
        .delete(`/images/${item['id']}`)
        .then((response) => {

        })
    },
    onImageClick(item) {
    }
  },
  mounted() {
    this.getItems()
  }
}
</script>

<style scoped>
.my-btn-upload input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
}
</style>
