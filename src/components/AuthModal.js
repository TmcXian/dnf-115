import { apiLogin, apiRegister } from '../api.js';
import { authState, closeAuthModal, switchAuthTab, loginSuccess, showToast } from '../store.js';

export default {
  name: 'AuthModal',
  data() {
    return {
      loginForm: { username: '', password: '' },
      regForm: { username: '', password: '' },
      loginError: '', regError: '', regPwdError: '',
      loginLoading: false, regLoading: false
    };
  },
  computed: { authState: () => authState },
  methods: {
    closeAuthModal,
    switchAuthTab(tab) { this.loginError = ''; this.regError = ''; this.regPwdError = ''; switchAuthTab(tab); },
    async handleLogin() {
      this.loginError = '';
      if (!this.loginForm.username || !this.loginForm.password) { this.loginError = '请填写完整信息'; return; }
      this.loginLoading = true;
      try {
        const data = await apiLogin(this.loginForm.username, this.loginForm.password);
        if (data.success) { loginSuccess(data.token, data.user); showToast('祝您天天出太初！', 'success', 4000); this.resetForms(); }
        else { this.loginError = data.message || '登录失败'; }
      } catch { this.loginError = '网络错误，请稍后重试'; }
      this.loginLoading = false;
    },
    async handleRegister() {
      this.regError = ''; this.regPwdError = '';
      const u = this.regForm.username.trim();
      if (!u || u.length < 3 || u.length > 20) { this.regError = '用户名需3-20位'; return; }
      if (!this.regForm.password || this.regForm.password.length < 6) { this.regPwdError = '密码需6位及以上'; return; }
      this.regLoading = true;
      try {
        const data = await apiRegister(u, this.regForm.password);
        if (data.success) { loginSuccess(data.token, data.user); showToast('注册成功！', 'success', 4000); this.resetForms(); }
        else { this.regError = data.message || '注册失败'; }
      } catch { this.regError = '网络错误，请稍后重试'; }
      this.regLoading = false;
    },
    resetForms() { this.loginForm = { username: '', password: '' }; this.regForm = { username: '', password: '' }; this.loginError = ''; this.regError = ''; this.regPwdError = ''; }
  },
  template: `
  <Teleport to="body"><transition name="modal">
    <div v-if="authState.showModal" class="modal-overlay" @click.self="closeAuthModal">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>{{ authState.modalTab === 'login' ? '用户登录' : '用户注册' }}</h3>
          <button class="modal-close" @click="closeAuthModal">&times;</button>
        </div>
        <div class="modal-body">
          <form v-if="authState.modalTab === 'login'" @submit.prevent="handleLogin">
            <div class="form-group"><label>用户名</label>
              <input type="text" class="input" v-model="loginForm.username" :class="{error:loginError}" placeholder="请输入用户名" />
              <p class="field-error" v-if="loginError">{{ loginError }}</p></div>
            <div class="form-group"><label>密码</label>
              <input type="password" class="input" v-model="loginForm.password" placeholder="请输入密码" /></div>
            <button type="submit" class="btn btn-primary submit-btn" :disabled="loginLoading">{{ loginLoading ? '登录中...' : '登录' }}</button>
            <p class="form-switch">还没有账号？<button type="button" class="link-btn" @click="switchAuthTab('register')">立即注册</button></p>
          </form>
          <form v-else @submit.prevent="handleRegister">
            <div class="form-group"><label>用户名</label>
              <input type="text" class="input" v-model="regForm.username" :class="{error:regError}" placeholder="3-20位字母/数字/中文/下划线" />
              <p class="field-error" v-if="regError">{{ regError }}</p></div>
            <div class="form-group"><label>密码</label>
              <input type="password" class="input" v-model="regForm.password" placeholder="6位及以上" />
              <p class="field-error" v-if="regPwdError">{{ regPwdError }}</p></div>
            <button type="submit" class="btn btn-primary submit-btn" :disabled="regLoading">{{ regLoading ? '注册中...' : '注册' }}</button>
            <p class="form-switch">已有账号？<button type="button" class="link-btn" @click="switchAuthTab('login')">立即登录</button></p>
          </form>
        </div>
      </div>
    </div>
  </transition></Teleport>`
};
