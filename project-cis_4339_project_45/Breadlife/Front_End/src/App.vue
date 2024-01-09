<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Bread of Life Application</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Intake</router-link>
          </li>
          

          <li class="nav-item">
            <router-link class="nav-link" to="/distView">Distribution</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/vaccineChart"> Vaccine Chart </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/raceChart">  Race Chart </router-link>
          </li>




        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>