<template>
  <div id="admin-page">
    <InputSearch v-model="shops" @paginate="paginate" />
    <List class="list" :shops="shops" />
    <div v-if="shops && shops.length" class="pagi-info">
      <Pagination
        class="pagination"
        v-model="page"
        :records="totalCount"
        :per-page="perPage"
        @paginate="paginate"
        :options="paginationOptions"
      />
    </div>
    <p class="empty-msg" v-else>No Records Found</p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Pagination from 'vue-pagination-2'

export default {
  name: 'HomePage',
  components: {
    Pagination,
  },
  data() {
    return {
      shops: [],
      limit: 5,
      start: 0,
      page: 1,
      perPage: 5,
      paginationOptions: {
        chunk: 5,
      },
      totalCount: 0,
    }
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      return this.$router.push('/login')
    }
    this.initialFetch(jwt)
  },
  methods: {
    async paginate() {
      this.start = (this.page - 1) * this.perPage
      const jwt = Cookies.get('jwt')
      this.$axios.setToken(jwt, 'bearer')
      this.$store.commit('SET_LOADING')
      const shops = await this.$axios.$get(
        `/shops?_start=${this.start}&_limit=${this.limit}&_sort=created_at:desc`
      )
      this.shops = shops
      this.$store.commit('SET_LOADING')
    },
    async initialFetch(jwt) {
      this.$axios.setToken(jwt, 'bearer')
      this.$store.commit('SET_LOADING')
      this.shops = await this.$axios.$get(
        `/shops?_start=${this.start}&_limit=${this.limit}&_sort=created_at:desc`
      )
      this.totalCount = await this.$axios.$get(`/shops/count`)
      this.$store.commit('SET_LOADING')
    },
  },
}
</script>

<style lang="scss" scoped>
#admin-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 90px 20px 0 20px;

  .list {
    margin-top: 36px;
  }
  .empty-msg {
    text-align: center;
    font-weight: 300;
    color: #b1b1b1;
  }
  .pagi-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    margin-top: 20px;
    ::v-deep .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0 12px;
        cursor: pointer;
      }
      ul {
        list-style: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0.5px solid rgba(0, 0, 0, 0.137);
        margin-bottom: 12px !important;
        border-radius: 6px;
        padding: 8px 0 !important;
      }
      p {
        text-align: center;
        font-size: 14px;
        font-weight: 300;
      }
      .disabled {
        opacity: 0.2 !important;
      }
      .active {
        color: rgb(223, 50, 50);
      }
    }
  }
}
</style>
