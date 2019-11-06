# Check复选框

<mobile>
  <p>当前数据：{{foods}}<p>
  <mp-check-group v-model="foods" :max="2" style="padding:15px 0">
    <mp-check value="hamburger" label="汉堡" style="margin-right:30px"></mp-check>
    <mp-check value="cola" label="可乐" style="margin-right:30px"></mp-check>
    <mp-check value="steak" label="牛排" disabled></mp-check>
  </mp-check-group>
</mobile>

<script>
export default {
  name: "check",
  data() {
    return {
      foods: []
    };
  }
};
</script>

::: demo

```html
<template>
  <div>
    <p>当前数据：{{foods}}<p>
    <mp-check-group v-model="foods" :max="2" style="padding:15px 0">
      <mp-check value="hamburger" label="汉堡" style="margin-right:30px"></mp-check>
      <mp-check value="cola" label="可乐" style="margin-right:30px"></mp-check>
      <mp-check value="steak" label="牛排" disabled></mp-check>
    </mp-check-group>
  </div>
</template>

<script>
export default {
  name: "check",
  data() {
    return {
      foods: []
    };
  }
};
</script>
```

:::
