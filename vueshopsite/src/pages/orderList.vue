<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{ active: head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import VDatePicker from '../components/base/datepicker'
import _ from 'lodash'

export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      query: "",
      productId: 0,
      startDate: '',
      endDate: '',
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId',
          // active: false
        },
        {
          label: '购买产品',
          key: 'product',
          // active: false
        },
        {
          label: '版本类型',
          key: 'version',
          // active: false
        },
        {
          label: '有效时间',
          key: 'period',
          // active: false
        },
        {
          label: '购买日期',
          key: 'date',
          // active: false
        },
        {
          label: '数量',
          key: 'buyNum',
          // active: false
        },
        {
          label: '总价',
          key: 'amount',
          // active: false
        }
      ],
      // tableData: [],
      currentOrder: 'asc'
    }
  },
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  watch: {
    query () {
      this.$store.commit('updateParams', {
        key: 'query',
        val: this.query
      });
      this.$store.dispatch('fetchOriderList')
    }
  },
  methods: {
    productChange (productObj) {
      this.$store.commit('updateParams', {
        key: 'productId',
        val: productObj.value
      });
      this.$store.dispatch('fetchOriderList')
      // this.productId = productObj.value;
      // this.getTableData();
    },
    getStartDate (startObj) {
      this.$store.commit('updateParams', {
        key: 'startDate',
        val: startObj
      });
      this.$store.dispatch('fetchOriderList')
      // this.startDate = startObj;
      // this.getTableData();
    },
    getEndDate (endObj) {
      this.$store.commit('updateParams', {
        key: 'endDate',
        val: endObj
      });
      this.$store.dispatch('fetchOriderList')
      // this.endDate = endObj;
      // this.getTableData();
    },
    changeOrderType (headItem) {
      /* 设置tableHeads为灰色 */
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    },
    getTableData (){
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.get('/api/getOrderList', reqParams).then((res) => {
        this.tableData = res.data.list;
      }, (err) => {
        console.log(err);
      })
    }
  },
  mounted () {
    this.$store.dispatch('fetchOriderList')
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
