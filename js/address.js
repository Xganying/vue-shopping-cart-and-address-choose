// address.js

new Vue({
    el:".container",
    data:{
        addressList:[],
        limitAddressNumber:3,
        currentIndex:0,
        shippingMethod:1

    },
    mounted: function(){
         this.$nextTick(function(){
            this.getAddressList();
        })
    },
    computed:{
        filterAddress: function(){
            return this.addressList.slice(0, this.limitAddressNumber);
        }
    },
    methods:{
        getAddressList: function(){
            var _this = this;
            this.$http.get("data/address.json").then(function(res){
                if(res.data.status == "0"){
                    _this.addressList = res.data.result;
                }
            });
        },
        // 显示所有的地址
        loadAllAddress: function(){
            this.limitAddressNumber = this.addressList.length;
        },
        // 设置默认地址事件
        setDefault: function(addressId){
            this.addressList.forEach(function(address, index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault= false;
                }
            })
        }

    }
})