<template>
  <v-footer
    color="#203E5F"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="py-3 text-center white--text"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} — Harden News
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    data() {
        return {
            links: [
                'Contact Us',
                'Privacy Polices',
                'Terms of Use'
            ],
        }
    }
}
</script>

<style>

</style>