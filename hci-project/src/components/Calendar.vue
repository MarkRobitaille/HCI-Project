<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="header">
      <h1>Calendar</h1>
      <button class="addEventButton">Add Event</button>
    </div>

    
    <table class="table">
      <!-- Month Name and prev, next buttons -->
      <tr>
        <th class="prevButtonHeader"><button class="prevNextMonthButton">Prev</button></th>      
        <th colspan="5" class="monthHeader">November</th>
        <th class="nextButtonHeader"><button class="prevNextMonthButton">Next</button></th>
        
      </tr>
      <!-- Days of the week -->
      <tr class="weekdayHeader">
        <th>Sun</th>
        <th>Mon</th>
        <th>Tues</th>
        <th>Wed</th>
        <th>Thur</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
      <!-- Week 1 -->
      <tr class="week">
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td>1</td>
        <td>2</td>
      </tr>
      <!-- Week 2 -->
      <tr class="week">
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <!-- Week 3 -->
      <tr class="week">
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
      </tr>
      <!-- Week 4 -->
      <tr class="week">
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>
        <td>22</td>
        <td>23</td>
      </tr>
      <!-- Week 5 -->
      <tr class="week">
        <td>24</td>
        <td>25</td>
        <td>26</td>
        <td>27</td>
        <td>28</td>
        <td>29</td>
        <td>30</td>
      </tr>
      <!-- Week 6 -->
      <tr class="week">
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
        <td class=inactiveDay>29</td>
        <td class=inactiveDay></td>
        <td class=inactiveDay></td>
      </tr>
    </table>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: "Calendar",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
    };
  },
  computed: {
    // Computed variables
  },
  methods: {
    // Methods in this component
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
.header {
  height: 10vh;
  color:black;
}

.addEventButton {
  position: absolute;
  right: 5vh;
  top: 4vh;
  min-height: 20px;
  height: 5vh;
}


.table {
  height: 85vh;
  width: 99%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh; 
  margin-left: auto;
  margin-right: auto;
}

th,
td {
  border: 0.1vw solid black;
}

.prevNextMonthButton {
  vertical-align: middle;
  min-height: 20px;
  height: 5vh;
}

.monthHeader {
  font-size: 5vh;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  height: 10vh;
  vertical-align: middle;
  border-left:0;
  border-right: 0;
  background-color: #bce7f7;
}

.prevButtonHeader{
  border-right: 0;
  background-color: #bce7f7;
}

.nextButtonHeader{
  border-left: 0;
  background-color: #bce7f7;
}

.weekdayHeader {
  background-color: #def5fc;
  height: 5vh;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
}

.week {
  height: calc(70vh/6vh);
  background-color: #def5fc;
}

.inactiveDay {
  background-color: lightgrey;
  color: lightgray;
}
</style>
