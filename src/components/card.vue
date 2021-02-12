<template>
  <div class="d-flex justify-content-center pb-3 overlay">
    <div class="shadow" style="width: 18rem;" @click="addCart(product)">
      <img :src="images" :alt="name" class="card-img-top image" />
      <div class="card-body border-top">
        <h5>{{ name }}</h5>
        <h3 class="font-weight-bold">Rp.{{ price }}</h3>
      </div>
      <div class="middle">
        <div class="text">Click to Add</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "card",
  props: {
    images: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['addCart'])
  }
};
</script>

<style scoped>
.overlay {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.overlay:hover .image {
  opacity: 0.4;
}

.overlay:hover .middle {
  opacity: 1;
}

.text {
  color: black;
  font-size: 16px;
}
</style>
