<template>
    <div>
      <template>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h5 class="font-semibold m-0" style="font-family: 'Mitr', sans-serif;">พนักงาน</h5>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <div class="table-upload-btn">
              <a-button type="primary" @click="showModal">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
                    fill="#111827"
                  />
                </svg>
                เพิ่มพนักงาน
              </a-button>
            </div>
          </a-col>
        </a-row>
      </template>

        <!-- galleryBlock -->
        <div class="block galleryBlock">
            <v-container>
            <div class="card-body">
                <v-row>
                    <v-col
                    v-for="item in pageOfItems"
                    :key="item.id"
                    class="d-flex child-flex"
                    cols="6"
                    sm="4"
                    >
                    <v-card flat tile class="d-flex">
                        <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                            </v-row>
                        </template>
                        </v-img>
                    </v-card>
                    </v-col>
                </v-row>
            </div>
            <div class="card-footer pb-0 pt-3">
                <jw-pagination
                :pageSize=6
                :items="items"
                @changePage="onChangePage"
                :labels="customLabels"
                ></jw-pagination>
            </div>
            </v-container>
        </div>
        </div>
</template>

<script>
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};
export default {
  name: "Gallery",
  data() {
    return {
        customLabels,
        pageOfItems: [],
        items: [
            {
            id: 1,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 2,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 3,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 4,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 5,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 6,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 7,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 8,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 9,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 10,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 11,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
            {
            id: 12,
            src: require("../assets/images/banner/K_Banner570.jpg"),
            },
        ],
    };
  },
      methods: {
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
    }
};
</script>


<style scoped>
    .galleryBlock{ 
        cursor: pointer; 
        }
    .pagination {
           justify-content: center;
           flex-wrap: wrap;
    }

</style>