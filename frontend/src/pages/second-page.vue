<script setup lang="ts">
import AuthService from '@/services/auth/auth.service'
import {useAuthStore} from '@/store/auth'
const authService = new AuthService()

const testeAuth = () => {
  authService.authVerifyToken()
    .then(data => {
      console.log('data', data)
    })
    .catch(e => {
      console.log('e', e)
    })
}

const refreshToken = () => {
  authService.AuthRefreshToken()
}

const authUser  = () => {
  const authUser  = useAuthStore()
  authUser.checkToken()
}
</script>

<template>
  <div>
    <VCard title="Create Awesome 🙌">
      <VCardText>This is your second page.</VCardText>

      <VCardText>
        Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
        Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie
        wafer tart marzipan bonbon. Gingerbread jelly-o dragée
        chocolate.
      </VCardText>
    </VCard>
    <VCol>
      <VBtn
        block
        color="primary"
        @click="testeAuth"
      >
        teste-auth
      </VBtn>
    </VCol>
<VCol>
    <VBtn
      block
      color="primary"
      @click="refreshToken"
    >
      teste-refreshToken
    </VBtn>
</VCol>
    <VCol>
    <VBtn
      block
      color="primary"
      @click="authUser"
    >
      teste-authUser
    </VBtn>
</VCol>
  </div>
</template>

