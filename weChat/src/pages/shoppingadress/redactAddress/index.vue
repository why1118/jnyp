<template>
    <div class="outbox">
        <div class="chagne_add_data">
            <div class="user_change_data">
                <input v-model="consignee" class="user_address_data" type="text" placeholder="收货人">
                <span class="user_address_right"><img src="/static/images/lt.svg" alt=""></span>
            </div>
            <div class="user_change_data">
                <input v-model="consigneePhone" class="user_address_data" type="text" placeholder="手机号码">
                <span class="user_address_right user_address_right2"><i>+ 86</i><img src="/static/images/lt.svg" alt=""></span>
            </div>
            <view class="user_change_data">
                <picker
                    mode="region"
                    @change="RegionChange"
                    :value="region"
                    :custom-item="customItem"
                >
                    <view class="user_change_data">
                        <input v-model="region" class="user_address_data" type="text" placeholder="所在地区">
                        <span class="user_address_right"><img src="/static/images/lt.svg" alt=""></span>
                    </view>
                </picker>
            </view>
            <div class="user_change_data user_textarea">
                <textarea v-model="oldminute" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元 室等"></textarea>
            </div>
        </div>
        <div class="user_data_title">
            <div class="user_title_type">
                <p class="title_type_tit">标签</p>
                <div class="user_every_type">
                    <span @click="addressTag = index" :class="addressTag === index ? 'type_active' : ''" v-for="(item, index) in typeData" :key="index">{{item}}</span>
                </div>
            </div>
            <div class="user_default_address">
                <p class="set_default_address">设为默认地址</p>
                <switch @click="state = ++state % 2" color="rgba(51,214,197,1)" name="switch" :checked="state === 0" />
            </div>
        </div>
        <div v-if="flags" class="user_change_button">
            <button @click="addNewData('del')">删除收货信息</button>
            <button @click="addNewData" class="btn_action">保存</button>
        </div>
        <button v-if="addbtn" class="submit" @click="addNewData('add')">保存</button>
    </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
    data(){
        return {
            region: ['北京市','北京市','海淀区'],
            customItem: '全部',
            provinceId:'',   //省的Id
            cityId:'',   //市的Id
            areaId:'',   //区的Id
            flags: false,
            uaid: 0,
            consignee: '',
            consigneePhone: '',
            address: '',
            oldminute: '',
            addressTag: '',
            state : 1,
            typeData: ['家', '公司', '学校', '其它'],
            boxFlag: false,
            addbtn: true,
            list: []
        }
    },
    async onLoad(options){
        wx.setNavigationBarTitle({title: '收货地址'})
        if(options.id){
            this.uaid = options.id;
            this.flags = true;
            this.addbtn = false;
            this.list = await this.submit();
            this.list = this.list.data.result;
            this.list.forEach(item => {
                if(item.uaid+"" === options.id) {
                    this.consignee = item.consignee,
                    this.consigneePhone = item.consigneePhone,
                    this.region = [item.provinceName, item.cityName, item.areaName],
                    this.oldminute = item.address,
                    this.addressTag = item.addressTag,
                    this.state = item.state,
                    this.cityId = item.cityId,
                    this.areaId = item.areaId,
                    this.provinceId = item.provinceId
                }
            })
        } else {
            this.uaid = false;
            this.flags = false;
            this.addbtn = true;
            this.consignee = '',
            this.consigneePhone = '',
            this.region = '',
            this.oldminute = '',
            this.addressTag = '',
            this.state = 1
        }
    },
    methods: {
        ...mapActions({
            addressList: 'getAddressList/addressList',
            changeUserAddress: 'getAddressList/changeUserAddress',
            addNewAddress: 'getAddressList/addNewAddress',
            submit:'newadd/submit'
        }),
        RegionChange(e) {
            if(e.target.value[0]==="全部") {
                wx.showToast({
                    title: '请重新选择', //提示的内容,
                    icon: 'none', //图标,
                });
            }else{
                this.region = e.target.value,
                this.boxFlag = false;
                this.provinceId = e.target.code[0];   //省的Id
                this.cityId = e.target.code[1];   //市的Id
                this.areaId = e.target.value[2]==="全部" ? e.target.code[1] : e.target.code[2];   //区的Id
            }

        },
        async addNewData(add){
            if(!this.consignee){
                wx.showToast({
                    title: '请输入联系人', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.consigneePhone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.consigneePhone)){
                wx.showToast({
                    title: '请输入正确的手机号', //提示的内容,
                    icon: 'none', //图标,
                });
                return false;
            }
            //console.log('region', !this.region, this.region.length != 3, this.region)
            if(!this.region){
                wx.showToast({
                    title: '请输入收货地址', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            //console.log('oldminute', !this.oldminute, !this.oldminute)
            if(!this.oldminute){
                wx.showToast({
                    title: '请输入详细地址', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            let addAddressData ={
                provinceId: this.provinceId,//省id
                provinceName: this.region[0],//省名称this.provinceName
                cityId: this.cityId,//市id
                cityName : this.region[1],//市名称this.cityName
                areaId: this.areaId,//区域idthis.areaId
                areaName: this.region[2],//区名称this.areaName
                address: this.oldminute,//具体地址
                consignee: this.consignee,//收货人
                consigneePhone: this.consigneePhone,//收货人手机号
                addressTag: this.addressTag + 1 + '',//地址标签 1.家 2.公司 3.学校 4.其他
                state: this.state,//0默认地址 1非默认地址
            }
            if(add === 'add') {
                let newAdd = await this.addNewAddress(addAddressData)
            } else if(add === 'del') {
                addAddressData.state = '2'
                addAddressData.uaid = this.uaid
                let delData = await this.changeUserAddress(addAddressData)
            } else {
                addAddressData.uaid = this.uaid
                let change = await this.changeUserAddress(addAddressData)
            }
            wx.navigateBack()
            return true;
        },
        searchAddress() {
            this.boxFlag = true;
        },
        close() {
            this.boxFlag = false;
        },

    },
    async onShow(){
        if(this.uaid) {
            let data = await this.addressList({uaid: this.uaid})
        }
    }
}
</script>

<style lang="scss" scoped>
.outbox{
    width: 100%;
    height: 100%;
    background:rgba(243,247,247,1);
    font-family: 'PingFangSC-Regular';
}
.chagne_add_data{  /* 705.9rpx */
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-bottom: 10px;
}
.user_change_data{
    width: 351px;
    height: 45px;
    margin: 0 auto;
    display: flex;
    line-height: 45px;
    border-bottom: 1px solid #F6F6F6;
    font-size: 14px;
}
.user_address_data{
    flex: 1;
    height: 45px;
    padding-left: 5px;
    width: 100%;
}
.user_address_right{
    display: inline-block;
    color: #9CA0A5;
}
.user_address_right img{
    width:5px;
    height:9px;
}
.user_address_right2{
    display: flex;
    align-items: center;
    color: #9CA0A5;
}
.user_address_right2 i{
    margin-right: 10px;
}
picker{
    width: 351px;
    margin: 0 auto;
}
.picker{
    width: 100%;
}
.user_textarea{
    height: 88px;
    font-weight:400;
    line-height: 20px;
    font-size: 14px;
    border-bottom: 0;
}
.user_textarea textarea{
    width: 308px;
    height: 88px;
    margin: 13px 5px;
}
.user_data_title{
    width: 100%;
    height: 143px;
    background: #fff;
}
.user_title_type{
    width: 351px;
    margin: 0 auto;
    border-bottom: 1px solid #F6F6F6;
}
.title_type_tit{
    font-size:14px;
    font-weight:400;
    color:rgba(50,58,69,1);
    margin-left: 5px;
    height: 31px;
    line-height: 31px;
}
.user_every_type{
    width: 351px;
    height: 67px;
    margin: 0 auto;
    display: flex;
}
.user_every_type span{
    width: 66px;
    height: 26px;
    border-radius:150px;
    margin: 1px 7px;
    border:1px solid rgba(187,187,187,1);
    font-size:15px;
    line-height: 26px;
    text-align: center;
    color:rgba(50,58,69,1);
}
.user_every_type span.type_active{
    background:rgba(51,214,197,1);
    color:#fff;
    border:1px solid rgba(51,214,197,1);
}
.user_default_address{
    display: flex;
    width: 351px;
    margin: 0 auto;
    height: 45px;
    line-height: 45px;
    font-size:14px;
}
.set_default_address{
    margin-left: 5px;
    flex: 1;
}
.user_change_button{
    width: 100%;
    height: 152px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.user_change_button button{
    width: 144px;
    height: 50px;
    border-radius:7px;
    border:1px solid rgba(51,214,197,1);
    font-size:18px;
    color:rgba(51,214,197,1);
}
.user_change_button button.btn_action{
    border: 0;
    color: #fff;
    background:rgba(51,214,197,1);
}
.holdAddress{
  width: 100%;
  height: 100%;
}
.addressMask{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  background:rgb(165, 164, 164);
  .box{
    width: 100%;
    height:397px;
    background:#fff;
    position: absolute;
    left:0;
    bottom: 0;
    .search{
      width: 44px;
      height:44px;
      line-height:44px;
      text-align: center;
      border-bottom:2px solid rgba(252, 93, 123, 1);
      position: absolute;
      top:52px;
      left:80px;
      font-size:14px;
      color:rgba(252, 93, 123, 1);
    }
    p{
      width: 100%;
      height:52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 11px;
      box-sizing: border-box;
      span{
        font-size:14px;
        color:rgba(72, 72, 72, 1);
      }
      .close{
        font-size:20px;
        width:15px;
        height:15px;
        line-height:15px;
        color:rgba(72, 72, 72, 1);
        overflow: hidden;
      }
    }
    ul{
      width: 100%;
      li{
        width: 100%;
        height:44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:14px;
        color:rgba(50, 58, 69, 1);
        padding-left:14px;
        padding-right:17px;
        box-sizing: border-box;
        span{
          img{
            width: 14px;
            height:9px;
          }
        }
      }
      .color{
        color:rgba(252, 93, 123, 1);
      }
    }
  }
}
.show{
  display: block;
}
.hide{
  display: none;
}
.holdAddressChild{
  width: 100%;
  height:44px;
  line-height: 44px;
}
.submit {
  width: 90%;
  height: 50px;
  background: rgba(51, 214, 197, 1);
  border-radius: 7px;
  color: #ffffff;
  font-size: 18px;
  margin-left:5%;
  margin-top: 60px;
}

</style>
