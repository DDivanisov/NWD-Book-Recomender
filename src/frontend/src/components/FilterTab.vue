<template>
  <div class="wrapper">
    <div class="icon" ref="leftIcon">
      <i class="fas fa-angle-left" @click="scrollLeftByAmount"></i>
    </div>
    <ul
      class="tab-box"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      ref="tabBox"
    >
      <li
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="selectGenre(tab, index)"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="icon" ref="rightIcon">
      <i class="fas fa-angle-right" @click="scrollRight"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genre: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        'All',
        'Fiction',
        'Fantasy',
        'Science Fiction',
        'Mystery',
        'Thriller',
        'Romance',
        'Historical',
        'Non-Fiction',
        'Biography',
        'Self-Help',
        'Horror',
        'Adventure',
        'Comedy',
        'Drama',
      ],
      activeTab: 0,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    selectGenre(tab, index) {
      this.activeTab = index;
      this.$emit('genreSelected', tab);
    },
    setActiveTab(index) {
        this.activeTab = index;
      },
      startDrag(e) {
        this.isDragging = true;
        this.startX = e.pageX - this.$refs.tabBox.offsetLeft;
        this.scrollLeft = this.$refs.tabBox.scrollLeft;
      },
      onDrag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const x = e.pageX - this.$refs.tabBox.offsetLeft;
        const walk = (x - this.startX) * 2;
        this.$refs.tabBox.scrollLeft = this.scrollLeft - walk;
      },
      stopDrag() {
        this.isDragging = false;
      },
      scrollLeftByAmount() {
        this.$refs.tabBox.scrollLeft -= 200; 
      },
      scrollRight() {
        this.$refs.tabBox.scrollLeft += 200;
      },
      handleIcons() {
        const maxScrollLeft =
          this.$refs.tabBox.scrollWidth - this.$refs.tabBox.clientWidth;
        this.$refs.leftIcon.style.display =
          this.$refs.tabBox.scrollLeft <= 0 ? 'none' : 'flex';
        this.$refs.rightIcon.style.display =
          maxScrollLeft - this.$refs.tabBox.scrollLeft <= 1 ? 'none' : 'flex';
      },
    
  },
  mounted() {
      const index = this.tabs.indexOf(this.genre);
      this.activeTab = index;
      this.handleIcons();
      this.$refs.tabBox.addEventListener('scroll', this.handleIcons);
    },
    beforeUnmount() {
      this.$refs.tabBox.removeEventListener('scroll', this.handleIcons);
    },
  
};
</script>


  
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Poppins', sans-serif;
  }
  
  .wrapper {
    padding: 20px;
    position: relative;
    max-width: 100%;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow-x: hidden;
    border: 1px solid #e0e0e0;
  }
  
  .wrapper .icon {
    position: absolute;
    top: 0;
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: linear-gradient(90deg, #fff 70%, transparent);
    z-index: 1;
  }
  
  .wrapper .icon i {
    font-size: 18px;
    color: #555;
    transition: color 0.3s;
  }
  
  .wrapper .icon:first-child {
    left: 0;
    transform: rotate(180deg);
  }
  
  .wrapper .icon:last-child {
    right: 0;
    background: linear-gradient(270deg, #fff 70%, transparent);
  }
  
  .wrapper .icon i:hover {
    color: #000;
  }
  
  .wrapper .tab-box {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 5px 60px; 
    scroll-behavior: smooth;
    scrollbar-width: none; 
  }
  
  .wrapper .tab-box::-webkit-scrollbar {
    display: none; 
  }
  
  .wrapper .tab {
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
    background-color: #f0f0f0;
    padding: 6px 12px;
    border-radius: 15px;
    transition: background-color 0.3s, color 0.3s;
    color: #333;
    border: 1px solid #d0d0d0;
  }
  
  .wrapper .tab:hover {
    background-color: #e0e0e0;
  }
  
  .wrapper .tab.active {
    background-color: #4070f4;
    color: #fff;
    border-color: #4070f4;
  }
  </style>
  