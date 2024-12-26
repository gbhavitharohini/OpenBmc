<template>
  <table class="hardware-status-table">
    <thead>
      <tr>
        <th>Device</th>
        <th>Status</th>
        <th>Temperature (°C)</th>
        <th>Memory Usage (%)</th>
        <th>CPU Usage (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(device, index) in devices" :key="index">
        <td>{{ device.name }}</td>
        <td>
          <span v-if="device.status === 'online'" class="online">Online</span>
          <span v-else class="offline">Offline</span>
        </td>
        <td>{{ device.temperature }} °C</td>
        <td>{{ device.memoryUsage }} %</td>
        <td>{{ device.cpuUsage }} %</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      devices: [
        {
          name: 'Server 1',
          status: 'online',
          temperature: 35,
          memoryUsage: 60,
          cpuUsage: 40,
        },
        {
          name: 'Server 2',
          status: 'offline',
          temperature: 30,
          memoryUsage: 80,
          cpuUsage: 20,
        },
        {
          name: 'Router 1',
          status: 'online',
          temperature: 40,
          memoryUsage: 50,
          cpuUsage: 30,
        },
      ],
    };
  },
};
</script>

<style scoped>
.hardware-status-table {
  border-collapse: collapse;
  width: 100%;
}

.hardware-status-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.hardware-status-table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.hardware-status-table th {
  background-color: #f0f0f0;
}

.hardware-status-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
