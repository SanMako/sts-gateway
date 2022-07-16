<template>
  <div class="login-container">
    <div class="form-container">
      <sts-form
        class="login-form"
        :model="loginFormState"
        :rules="rules"
        @finish="handleLogin"
      >
        <span class="login-form-header"> Strong to Stop </span>
        <sts-form-item class="login-form-item" name="username">
          <span class="input-label">账号：</span>
          <sts-input
            v-model:value="loginFormState.username"
            class="login-form-input"
            autocomplete="off"
            placeholder="请输入用户名"
            :bordered="false"
          />
          <div class="focus-input"></div>
          <svg-icon class="login-form-prefix" name="user" :size="22" />
          <svg-icon
            v-if="loginFormState.username"
            class="login-form-suffix"
            name="close"
            :size="18"
            @click="loginFormState.username = ''"
          />
        </sts-form-item>
        <sts-form-item class="login-form-item" name="password">
          <span class="input-label">密码:</span>
          <sts-input
            v-model:value="loginFormState.password"
            autocomplete="off"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            class="login-form-input"
            :bordered="false"
            size="default"
          />
          <div class="focus-input"></div>
          <svg-icon class="login-form-prefix" name="lock" :size="22" />
          <svg-icon
            v-if="loginFormState.password && !showPassword"
            class="login-form-suffix"
            name="eye"
            :size="18"
            @click="showPassword = !showPassword"
          />
          <svg-icon
            v-if="loginFormState.password && showPassword"
            class="login-form-suffix"
            name="eye-close"
            :size="18"
            @click="showPassword = !showPassword"
          />
        </sts-form-item>
        <sts-form-item :wrapper-col="{ offset: 19, span: 24 }">
          <sts-button type="link" style="padding-bottom: 30px">
            忘记密码？
          </sts-button>
        </sts-form-item>
        <div class="login-form-footer">
          <div class="login-form-btn-container">
            <div class="login-form-btn-bg"></div>
            <sts-button class="login-form-button" html-type="submit">
              登录
            </sts-button>
          </div>
        </div>
      </sts-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive, ref } from "vue";
import { StsForm } from "sts-parent/StsForm";

export default defineComponent({
  name: "Login",
  components: {
    StsButton: defineAsyncComponent(() => import("sts-parent/StsButton")),
    StsInput: defineAsyncComponent(() => import("sts-parent/StsInput")),
    SvgIcon: defineAsyncComponent(() => import("sts-parent/SvgIcon")),
    StsForm,
    StsFormItem: StsForm.Item,
  },
  setup() {
    const loginFormState = reactive({
      username: "",
      password: "",
      authType: "",
    });

    const showPassword = ref<boolean>(false);

    const validateUsername = async (_rule: Rule, value: string) => {
      // if (value === "") {
      //   return Promise.reject(i18n.t("login.form.username_placeholder"));
      // }
      return Promise.resolve();
    };

    const validatePassword = async (_rule: Rule, value: string) => {
      // if (value === "") {
      //   return Promise.reject(i18n.t("login.form.password_placeholder"));
      // }
      return Promise.resolve();
    };

    const rules = {
      username: [
        { required: true, validator: validateUsername, trigger: "change" },
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "change" },
      ],
    };

    const handleLogin = async (values) => {
      // await loginByUsernamePassword(values);
    };

    return {
      rules,
      loginFormState,
      showPassword,
      handleLogin,
    };
  },
});
</script>

<style lang="less">
@import "/@/styles/login.less";
</style>
