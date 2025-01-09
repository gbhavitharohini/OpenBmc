<template>
  <div class="container-fluid p-3">
    <div class="row">
      <div class="col-md-3 nav-button">
        <button>System</button>
      </div>
      <div class="col-md-3 nav-button">
        <button>UID Control</button>
      </div>
      <div class="col-md-3 nav-button">
        <button>Firmware Update</button>
      </div>
      <div class="col-md-3 nav-button">
        <button>Sensor Readings</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">System</div>
          <div class="card-body">
            <div
              v-for="(item, index) in systemItems"
              :key="index"
              class="system-item"
            >
              <div :class="['circle-icon', item.iconClass]">
                {{ item.icon }}
              </div>
              <div class="item-label">
                {{ item.label }}
              </div>
              <div class="item-value">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Host</div>
          <div class="card-body">
            <p>Server Host Name</p>
            <p>Server IP Address</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span>Power Consumption</span>
            <a class="text-decoration-none text-light" href="#">View more</a>
          </div>
          <div class="card-body">
            <p class="text-center">X:Time(min) Y:Power Consumption(Watt)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span>Recent Log</span>
            <a class="text-decoration-none text-light" href="#">View more</a>
          </div>
          <div class="card-body">
            <div class="input-group mb-3">
              <input
                class="form-control search-bar"
                placeholder="Search logs"
                type="text"
              />
              <button
                class="btn btn-outline-secondary search-bar"
                type="button"
              ></button>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Date</th>
                  <th>Sensor</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center" colspan="4">No items available</td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data() {
    return {
      systemItems: [
        {
          icon: 'F',
          iconClass: 'f',
          label: 'Firmware Version',
          value: '1.0.0 .98',
        },
        {
          icon: 'F',
          iconClass: 'f',
          label: 'Firmware Build Time',
          value: ' January 2023',
        },
        {
          icon: 'R',
          iconClass: 'r',
          label: 'Redfish Version',
          value: 'v2.3',
        },
        {
          icon: 'B',
          iconClass: 'b',
          label: 'BIOS Firmware Version',
          value: '1.2a',
        },
        {
          icon: 'B',
          iconClass: 'b',
          label: 'BIOS Build Time',
          value: 'May 2022',
        },
        {
          icon: 'B',
          iconClass: 'bmc',
          label: 'BMC MAC address',
          value: '00:1B:21:XX:XX:XX',
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  background-color: #f0f0f0;
  color: #ffffff;
}
.nav-button {
  width: 100%;
  margin-bottom: 10px;
}
.nav-button button {
  background-color: #6c757d;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s;
}

.nav-button button:hover {
  background-color: #686666;
}
.card {
  min-height: 300px;
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #000000;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}
.card-header a {
  color: #007bff;
}
.card-header a:hover {
  color: #0056b3;
}
.card-body {
  font-size: 16px;
  color: #000000;
}
.icon {
  font-size: 20px;
  margin-right: 10px;
  color: #ffffff;
}
.search-bar {
  background-color: #79828b;
  border: none;
  color: #ffffff;
}
.search-bar::placeholder {
  color: #ffffff;
}
.table th,
.table td {
  color: #000000;
}
.table th {
  font-weight: bold;
  color: #000000;
}
.pagination {
  justify-content: center;
}
.pagination .page-link {
  background-color: #2a3b4c;
  border: none;
  color: #ffffff;
}
.pagination .page-link:hover {
  background-color: #3a4b5c;
  color: #ffffff;
}
.system-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.system-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.system-item .circle-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  font-weight: bold;
  color: #ffffff;
}
.system-item .circle-icon.f {
  background-color: #007bff;
}
.system-item .circle-icon.r {
  background-color: #dc3545;
}
.system-item .circle-icon.b {
  background-color: #28a745;
}
.system-item .circle-icon.bmc {
  background-color: #6c757d;
}
.system-item .item-label {
  flex-grow: 1;
}
.system-item .item-value {
  margin-left: auto;
}
</style>
