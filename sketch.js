const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter;
const sectionTag = document.querySelector("section.shapes");
const w = window.innerWidth;
const h = window.innerHeight;
const engine = Engine.create();
const renderer = Render.create({
  element:sectionTag,
  engine:engine,
  options: {
    height:h,
    width:w,
    background:'none',
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
});

const createShape = function(x, y) {}

var trash1 = Bodies.rectangle(100, 10, 200, 200, {
    render: {
      sprite: {
        texture: trash1_piece,
        xScale: 0.4,
        yScale:0.4,
      },}})

var trash2 = Bodies.rectangle(100, 10, 200, 200, {    
    render: {
      sprite: {
        texture: trash2_piece,
        xScale: 0.4,
        yScale:0.4,
      },}})

var trash3 = Bodies.rectangle(100, 10, 200, 210, {
                render: {
                  sprite: {
                    texture: trash3_piece,
                    xScale: 0.4,
                    yScale:0.4,
                  },}})

var trash4 = Bodies.rectangle(100, 10, 200, 300, {
    render: {
      sprite: {
        texture: trash4_piece,
        xScale: 0.6,
        yScale:0.6,
      },}})

var trash5 = Bodies.rectangle(100, 10, 200, 200, {
  render: {
    sprite: {
      texture:trash5_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})

var trash6 = Bodies.rectangle(100, 30, 200, 200, {
    render: {
      sprite: {
        texture: trash6_piece,
        xScale: 0.4,
        yScale:0.4,
      },}})

var trash7 = Bodies.rectangle(140, 10, 200, 40, {
  render: {
    sprite: {
      texture: trash7_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})          
var trash8 = Bodies.rectangle(130, 10, 200, 200, {
  render: {
    sprite: {
      texture: trash8_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})          
var trash9 = Bodies.rectangle(120, 10, 200, 200, {
  render: {
    sprite: {
      texture: trash9_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})
var trash10 = Bodies.rectangle(100, 10, 200, 200, {
  render: {
    sprite: {
      texture: trash10_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})

var trash11 = Bodies.rectangle(150, 10, 500, 50, {
  render: {
    sprite: {
      texture: trash11_piece,
      xScale: 0.6,
      yScale:0.6,
    },}})
var trash12 = Bodies.rectangle(480, 10, 200, 200, {
  render: {
    sprite: {
      texture: trash12_piece,
      xScale: 0.6,
      yScale:0.6,
    },}})
var trash13 = Bodies.rectangle(390, 10, 100, 100, {
  render: {
    sprite: {
      texture: trash13_piece,
      xScale: 0.4,
      yScale:0.4,
    },}})
var trash14 = Bodies.rectangle(510, 30, 200, 200, {
  render: {
    sprite: {
      texture: trash14_piece,
      xScale: 0.5,
      yScale:0.5,
    },}})
var trash15 = Bodies.rectangle(520, 40, 200, 200, {
  render: {
    sprite: {
      texture: trash15_piece,
      xScale: 0.5,
      yScale:0.5,
    },}})
var trash16 = Bodies.rectangle(600, 10, 200, 200, {
  render: {
    sprite: {
      texture: trash16_piece,
      xScale: 0.7,
      yScale:0.7,
    },}})
var trash17 = Bodies.rectangle(500, 10, 100, 50, {
  render: {
    sprite: {
      texture: trash17_piece,
      xScale: 0.3,
      yScale:0.3,
    },}})

const trashItems = [
  trash1, trash2, trash3, trash4, trash5, trash6, trash7, trash8,
  trash9, trash10, trash11, trash12, trash13, trash14, trash15, trash16, trash17
];

// 모든 trash 객체에 동일한 friction 값 설정
const frictionValue = 0.5; // 원하는 friction 값 (0.0 ~ 1.0 범위)
const rotationSpeedValue = 1;
const currentRotationValue = 0;
const inertiaValue = Infinity; 

trashItems.forEach(item => {
  item.friction = frictionValue;
  item.frictionAir = 0.02; // 공기 저항 값도 설정할 수 있습니다.
  item.render.currentRotation = currentRotationValue;
  item.render.rotationSpeed = rotationSpeedValue;
  item.render.inertia = inertiaValue;
});
          
const wallOptions = {
  isStatic:true,
  fillStyle:"lime",
  render: {
    
    visible: false,
    color:"red",
  }
}
const ground = Bodies.rectangle(w / 2,h + 45,w,100,wallOptions);
const ceiling = Bodies.rectangle(w/2, -45,w,100,wallOptions);
const leftWall = Bodies.rectangle(-47, h/2,100,h + 100,wallOptions);
const rightWall = Bodies.rectangle((w)+44, h/2,100,h + 100,wallOptions);


const mouseControl = MouseConstraint.create(engine, {
  element:sectionTag,
  constraint: {
    render: {
      visible:false
    }}
  });


const initialShapes = Composites.stack(1, 1, 1, 1, 1, 1, function (x, y) {
  return createShape(x, y)
})





// 사라질 사각형 정의
   const target = Bodies.rectangle(window.innerWidth * 0.95, window.innerHeight * 0.1, 50, 50, {
    isStatic: true,
    render: {
      visible: true,
      sprite: {
        texture: 'trashcan.png',  // 이미지 파일 경로
        xScale: 0.15,                // 이미지 크기 비율 조정
        yScale: 0.15
      }
    }
  });



  let removedTrashCount = 0;  // 제거된 trash 객체를 추적하는 카운터

  Matter.Events.on(engine, 'collisionStart', function(event) {
    let pairs = event.pairs;
  
    // 각 충돌쌍을 검사
    pairs.forEach(function(pair) {
      let trash;
  
      // 충돌한 객체들이 trash와 target일 경우
      if (trashItems.includes(pair.bodyA) && pair.bodyB === target) {
        trash = pair.bodyA;
      } else if (trashItems.includes(pair.bodyB) && pair.bodyA === target) {
        trash = pair.bodyB;
      }
  
      if (trash) {
        // trash 객체를 제거
        console.log('Trash removed: ', trash);  // 디버깅 로그
  
        // trash가 제거된 카운트 증가
        removedTrashCount++;
  
        // 17번째 trash가 제거되었을 때 alert 띄우기
        if (removedTrashCount === 16) {
          alert("All Worries are Disappeared!");
        }
  
        // 월드에서 trash 객체 제거
        World.remove(engine.world, trash);
        trashItems.splice(trashItems.indexOf(trash), 1); // trashItems에서 객체 제거
      }
    });
  });

World.add(engine.world, [
...trashItems,
  ground,
  target,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes
])

Engine.run(engine);
Render.run(renderer);

window.addEventListener("resize", function(){
  
  Engine.run(engine);
  Render.run(renderer);
})


// 기존 코드 끝에 붙이기
console.log("텍스처 파일 확인: ", pion_piece, rook_piece, knight_piece, fou_piece, queen_piece, king_piece,trash10);
console.log("체스 말 생성 확인:", pion, rook, knight, fou, queen, king,trash10);
console.log("World에 추가할 객체들:", pion, rook, knight, fou, queen, king, trash10, ground, ceiling, leftWall, rightWall, mouseControl);
console.log("Matter.js 엔진과 렌더러 실행됨");x
