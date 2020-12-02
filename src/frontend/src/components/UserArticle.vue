<template>
    <div>
        <v-container>

            <!-- img -->
            <v-row>
                <v-col cols="12">
                    <v-img
                        src="https://picsum.photos/id/11/500/300"
                    >
                    </v-img>
                </v-col>
            </v-row>

            <!-- Title -->
            <div class="row">
                <div class="col-12 text-h6 text-sm-h5 text-md-h4">
                    Timnas Indonesia Digebuk Ukraine, Indonesia menyatakan perang
                </div>
            </div>

            <!-- Sub titel -->
            <div class="row mt-n5">
                <div class="col-12 text-caption text-sm-body-2 text-md-subtitle-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nemo laborum?
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name : 'UserArticle',
    props : ["imageUrl", "title", "titleDesc"],
}
</script>