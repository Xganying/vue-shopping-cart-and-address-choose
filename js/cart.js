new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        // totalPrice:0,
        productList: [],
        checkAll: false,
        delFlag: false,
        curProduct: 0
    },
    filters: {
        formatMoney: function (value) {
            return " ￥ " + value.toFixed(2) + " 元 "; // 金额符号￥,金额为2为小数
        }
    },
    // 使用mounted钩子并不能保证该实例已经插入文档，应该在钩子函数中包含Vue.nextTick/vm.$nextTick
    mounted: function () {
        // this.cartView();
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        // 渲染页面商品数据
        cartView: function () {

            // 使用vue-recourse获取json数据
            // var _this = this;
            // this.$http.get("data/cartData.json", {"id":123}).then(function(res){
            //     _this.productList = res.data.result.list;
            //     _this.totalMoney = res.data.result.totalMoney;
            // });

            // 改成es6语法
            this.$http.get("data/cartData.json", { "id": 123 }).then(res => {
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            });

        },
        // 商品数量的改变
        changeMoney: function (product, way) {
            if (way > 0) {                      // +
                product.productQuantity++;
            } else {  
                product.productQuantity--;                          // - 
                if (product.productQuantity <= 0) {
                    product.productQuantity = 0;
                }
            }
        },
        // 商品是否被选中(单选)
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') { // 判断一个对象中的变量不存在
                // Vue.set(item, "checked", true);  // 通过Vue全局注册，往item中添加了一个值为true的属性
                this.$set(item, "checked", true);   // 局部注册
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        // 全选事件
        selectAll: function (flag) {
            this.checkAll = flag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", _this.checkAll);
                } else {
                    item.checked = _this.checkAll;
                }
            });
            this.calcTotalPrice();
        },
        // 计算总金额
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0; // 遍历前先金额清零
            this.productList.forEach(function (item, index) {
                if (item.checked) {  // 如果商品已经被选中
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        // 当前被选中的待删除商品
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        // 删除事件
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            // this.$http 应该调用接口，在后台进行删除
        }
    }
});

// 全局过滤器
Vue.filter("money",function (value,type) {
    return " ￥ " + value.toFixed(2) + type;
})