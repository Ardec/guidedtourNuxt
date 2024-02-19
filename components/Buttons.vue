<template>
  <div class="button-type">
    <div class="head-container">
      <h6 class="head-text">{{ $attrs?.name }}</h6>
    </div>
  </div>
  <div class="col-12 flex flex-center" v-for="item in $attrs?.items" :key="item.id">
    <div v-if="item.button.isActive == true" class="button-type">
      <NuxtLink :to="`/postsPage/button-${item.button.id}/${item.button.name}`">
        <div class="button-container">
          <div class="button-content">
            <div class="button-count">{{ item.button.visitingCard?.length }}</div>
            {{ item.button.name }}
          </div>
          <div class="arrow">></div>
        </div>
      </NuxtLink>
    </div>
  </div>
  <div class="back-container" @click="$router.back()">
    <div class="back-text">
      <span class="back">Back</span>
    </div>
    <div class="back-icon">&lt;</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.button-type {
  width: 100%;
  cursor: pointer;
  font-family: 'Inter Medium', sans-serif;
  a {
    text-decoration: none;
  }
  .button-container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 0;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

    .button-content {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;

      color: #000;
      font-size: 12px;
      font-weight: 600;
      line-height: 19px;
    }

    .button-count {
      border-radius: 4px;
      background: $accent;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 30px;
      height: 30px;

      color: #fff;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
    }

    .arrow {
      color: $accent;
    }
  }
}

.back-container {
  justify-content: flex-end;
  display: inline-flex;
  padding: 8px 0;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-right: 30px;
  margin-top: 36px;
}
.back-container:hover {
  cursor: pointer;
  opacity: 0.5;
}
.back-icon {
  color: #f59e0b;
}
.back-text {
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 29px;
}

.head-container {
  margin: 46px 0px 36px 40px;
  padding: 0px;
  .head-text {
    color: #000;
    font-size: 34px;
    font-style: normal;
    font-weight: bold;
    line-height: 39px; /* 114.706% */
    margin: 0px;
    padding: 0px;
  }
}

.dark {
  .button-type .button-container {
    border-bottom: 1px dashed #fff;
    .button-content {
      color: #fff;
    }
  }
  .head-text,
  .back-text {
    color: #fff;
  }
}
</style>
