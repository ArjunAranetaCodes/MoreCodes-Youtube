<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>Fist Name</td>
            <td>{{first_name}}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{{last_name}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data () {
    const token = localStorage.usertoken
    const decoded = jwtDecode(token)
    return {
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    }
  }
}
</script>
