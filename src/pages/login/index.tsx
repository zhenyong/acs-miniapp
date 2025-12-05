import IconFont from "@/components/iconfont/index.weapp";
import { Checkbox, Popup, Toast } from "@antmjs/vantui";
import { Button, Image, Text, View } from "@tarojs/components";
import { useCallback, useState } from "react";
import logoImg from "./logo.png";
import { rulesText, WEAPP_NAME } from "./rulestext.const";
import Taro from "@tarojs/taro";

import "./index.scss";

export default function LoginPage() {
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);

  const getPhoneNumber = useCallback((e: any) => {
    console.log("getPhoneNumber", e);
    // TODO: 处理获取手机号逻辑
    // e.detail.code 是临时登录凭证，需要传给后端换取用户信息
    // 可以调用登录接口，传入 code 参数
    // "a22e615665dc3b5c8ae4c1d4f1ccbd9c5ff77aa187b3c3b566006849f0fdfae76" code
    const code = e.detail.code;

    // 后端获取数据
    //     {
    //   "errcode": 0,
    //   "errmsg": "ok",
    //   "phone_info": {
    //     "phoneNumber": "13510231096",
    //     "purePhoneNumber": "13510231096",
    //     "countryCode": "86",
    //     "watermark": {
    //       "timestamp": 1764951848,
    //       "appid": "wx45016082a056f459"
    //     }
    //   }
    // }
    // "access_token": "98_vX5rnxErvYE26CdwKf7tQPCELAIhfw8mdG6I8iADxIBmbeelw-W7amgc8rojDiunQTrzLUhZfUTVn2SHA3aKs6q5i8mPY8iZxJQHaWTg52gEMUdZLhXVqp-brZsKSWiAGAVDH",
    // "expires_in": 7200
    // 调用后端登录接口

    // 登录成功后跳转到首页
    // TODO: 实现具体的登录逻辑
    // TODO: 调用登录API，传入code参数
    // TODO: 处理登录成功后的页面跳转
  }, []);

  return (
    <View className="bg-[#121420] flex flex-col px-10  items-center h-screen box-border safeInsetPaddingBottom">
      <View className="relative w-full h-full">
        {/* Logo 区域 中心点位于垂直1/4*/}
        <View
          className="w-full
        absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
        >
          <Image
            src={logoImg}
            style={{ width: "100%", height: "auto" }}
            mode="widthFix"
          />
        </View>
        <View className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[58%]">
          {/* 登录按钮 - 中心点位于垂直1/2 - 使用 box-shadow 实现发光边框 TODO 苹果没效果？  */}
          <View className="relative">
            <Button
              className="
              login-btn
            flex items-center justify-center gap-1
            w-full py-4 mb-3 rounded-xl
          bg-transparent border-[1px]
          // border-[#35F6FC]
          border-[#246970]
                   text-white text-base"
              style={{
                boxShadow:
                  "inset 0 0 5rpx rgba(179, 235, 255, 0.9), inset 0 0 24rpx 6rpx rgb(29, 97, 108)",
              }}
              openType="getPhoneNumber"
              onGetPhoneNumber={getPhoneNumber}
            >
              <IconFont name="phone" size={46} color="white"></IconFont>
              <Text className="text-lg mr-2">手机号一键登录</Text>
            </Button>
            {!checked && (
              <View
                onClick={() => {
                  Toast.show("请先阅读并同意用户协议");
                }}
                className="absolute inset-0 z-10"
              ></View>
            )}
          </View>
          {/* 协议区域 */}
          <View className="flex flex-row whitespace-nowrap items-center justify-center gap-1  w-full leading-[40rpx]">
            <Checkbox
              className="flex items-center"
              style={
                {
                  "--checkbox-border-color": "var(--color-neutral-500)",
                } as React.CSSProperties
              }
              iconSize="30rpx"
              value={checked}
              onChange={(e) => setChecked(e.detail)}
              checkedColor="#35F6FC"
            >
              <Text className="leading-['inherit'] text-xs text-neutral-500">
                已阅读并同意
              </Text>
            </Checkbox>
            <Text
              className="text-xs text-[#35F6FC] h-[40rpx] leading-[40rpx]"
              onClick={() => setShow(true)}
            >
              《ACS五恒小程序信息处理规则》
            </Text>
          </View>
        </View>
      </View>
      {/* 底部提示 */}
      {/* <Text className="text-gray-400 text-xs mt-auto">输入手机号登入</Text> */}
      <Popup
        round
        show={show}
        onClose={() => setShow(false)}
        position="bottom"
        className="text-gray-800"
      >
        <View className="p-4 text-center ">
          <Text className="text-base font-bold text-gray-400">
            {WEAPP_NAME}信息处理规则
          </Text>
        </View>
        <View className=" text-center">
          <Text className="text-base ">用户注册及使用小程序隐私协议</Text>
        </View>
        <View className="leading-[1.67] p-y-4 px-6 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
          {rulesText}
        </View>
      </Popup>
    </View>
  );
}
