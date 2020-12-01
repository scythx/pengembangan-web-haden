<template>
  <div>
    <div class="d-flex flex-row-reverse">
      <button type="button"
              class="btn btn-primary position-relative my-btn-upload">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
          <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
        <input type="file"
               accept="image/*"
               class="position-absolute"
               @change="onUploadInput">
      </button>
      <button type="button"
              class="btn btn-primary position-relative mr-2"
              @click="getItems">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </button>
    </div>
    <div class="row">
      <div class="col-md-3 p-2"
           v-for="item in items">
        <GalleryItem
          :name="item['name']"
          :url="item['url']"
          style="height: 200px;"
          @click-image="onImageClick(item)"
          @delete-image="deleteItem(item)"/>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="color: #fff;"></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style="color: #fff;">&times;</span>
              </button>
          </div>
          <div class="modal-body mx-auto">
            <img class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/http'
import GalleryItem from '@/components/GalleryItem'

export default {
  name: 'Gallery',
  components: {GalleryItem},
  data () {
    return {
      items: [{"name": "test", "url": "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"}]
    }
  },
  methods: {
    onUploadInput(event) {
      [...event.target.files].map((image) => {
        http.post('/images', {
          'name': image.name
        })
        .then((response) => {
          return image.arrayBuffer()
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
      http.get('/images')
      .then((response) => {
        this.items = response['data']
      })
    },
    deleteItem(item) {
      http.delete(`/images/${item['id']}`)
      .then((response) => {

      })
    },
    onImageClick(item) {
       this.$jquery('.modal-title').text(item['name'])
       this.$jquery('.modal-body img').attr('src', item['url'])
       this.$jquery('#exampleModal').modal('toggle')
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.my-btn-upload input[type=file] {
  top: 0;
  right: 0;
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
}

/* fullscreen-modal for image view
   https://stackoverflow.com/a/46382643 */

.modal {
  padding: 0 !important;
}

.modal .modal-dialog {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0;
}

.modal .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;

  background: rgb(0, 0, 0);
}

.modal .modal-body {
  overflow-y: auto;
}
</style>
