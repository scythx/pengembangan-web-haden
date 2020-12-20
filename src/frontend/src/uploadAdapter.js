import http from "@/http";
export default class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then((image) => {
      return http
        .post("/images", {
          name: image.name,
        })
        .then((response) => {
          return image.arrayBuffer().then((buffer) => {
            return http
              .put(`/images/${response.data["id"]}`, buffer, {
                headers: { "Content-Type": image.type },
              })
              .then((unused_response) => {
                return http.get(`/images/${response.data["id"]}`);
              });
          });
        })
        .then((response) => {
          return {
            default: response.data["url"],
          };
        });
    });
  }

  // Aborts the upload process.
  abort() {
    // NOT IMPLEMENTED
  }
}
