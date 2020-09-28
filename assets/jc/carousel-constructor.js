function Carousel(){
    this.container =document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.indicatorContainer.querySelectorAll('.indicator');
    this.controls = this.container.querySelector('#controls-container');
    this.pauseBtn = this.controls.querySelector('#pause-btn');
    this.prevBtn = this.controls.querySelector('#prev-btn');
    this.nextBtn = this.controls.querySelector('#next-btn');
    
    this.currentSlide = 0;
    this.interval=2000;
    this.slidesCount=this.slides.length ;
    this.timerID=null;
    this.isPlaying= true;
    this.swipeStartX = null;
    this.swipeEndX = null;
    
    this.SPACE='';
    this.LEFT_ARROW = 'ArrowLeft';
    this.RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class ="fas fa-pause"></i>';
    this.FA_PLAY = '<i class ="fas fa-play"></i>';

    this.initListeners();



}


Carousel.prototype = {
    initListeners(){
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
        this.container.addEventListener('touchstart', this.swiperStart.bind(this));
        this.container.addEventListener('touchstart', this.swiperEnd.bind(this));
    },



    gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (this.slidesCount + n) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    
    },
    
    
    gotoPrev (){
      this.gotoNth(this.currentSlide -1);
    
    },
    gotoNext (){
      this.gotoNth(this.currentSlide +1);
    
    },
    play(){
        this.pauseBtn.innerHTML =this.FA_PAUSE;
        this.isPlaying =!this.isPlaying;
        this.timerID=setInterval(this.gotoNext, this.interval);
      
      },
      
    pause(){
        if (this.isPlaying){
          this.pauseBtn.innerHTML = this.FA_PLAY;
          clearInterval(this.timerID);
          this.isPlaying =!this.isPlaying;
        }
        
      
      },
      
    pausePlay(){
        if(this.isPlaying) this.pause();
        else this.play();
      },
    prev(){
        this.pause();
        this.gotoPrev();
      },
    next(){
        this.pause();
        this.gotoNext();
      },
    indicate(e){
        let target = e.target;
       
        if(target.classList.contains('indicator')){
          this.pause();
          this.gotoNth(+target.dataset.slideTo);
        }
       },
       
      
    pressKey(e){
       if(e.key === this.LEFT_ARROW) this.prev();
       if(e.key === this.RIGHT_ARROW) this.next();
       if(e.key === this.SPACE) this.pausePlay();
       },
       
    swiperStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
       
    },
       
       
    swiperEnd(e) {
       this.swipeEndX = e.changedTouches[0].pageX;
       this.swipeStartX - this.swipeEndX > 100 && this.next();
       this.swipeStartX - this.swipeEndX < -100 && this.prev();   //**оптимизации для случайного нажатия */
       },

    init(){
       this.timerID=setInterval(() => this.gotoNext(), this.interval); 
    }   
};










    
    
    
    
    
    
    
   
    
    
  
    
 
   
  
  