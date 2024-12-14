const images = [
    'images/bau.png',
    'images/cua.png',
    'images/tom.png',
    'images/ca.png',
    'images/huou.png',
    'images/ga.png'
  ];
  let bets = [0, 0, 0, 0, 0, 0];
  let spinning = false;
  
  const resultBoxes = [
    document.getElementById('box1'),
    document.getElementById('box2'),
    document.getElementById('box3')
  ];
  const betPoints = [
    document.getElementById('bet0'),
    document.getElementById('bet1'),
    document.getElementById('bet2'),
    document.getElementById('bet3'),
    document.getElementById('bet4'),
    document.getElementById('bet5')
  ];
  const spinButton = document.getElementById('spin');
  const resetButton = document.getElementById('reset');
  
  function randomizeResults() {
    return images[Math.floor(Math.random() * images.length)];
  }
  
  spinButton.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
  
    let spins = 0;
    const interval = setInterval(() => {
      spins++;
      resultBoxes.forEach(box => {
        const randomImage = randomizeResults();
        box.style.backgroundImage = `url(${randomImage})`;
      });
  
      if (spins >= 100) {
        clearInterval(interval);
        spinning = false;
        compareResults();
      }
    }, 50);
  });
  
  function compareResults() {
    const results = resultBoxes.map(box => box.style.backgroundImage);
    let correct = 0;
  
    bets.forEach((bet, index) => {
      if (bet > 0 && results.some(image => image.includes(images[index]))) {
        correct += bet;
      }
    });
  
    console.log(correct > 0
      ? `Bạn đã đoán đúng với kết quả: ${results.map(res => res.split('/').pop().replace('.png', '')).join(', ')}`
      : `Bạn đã đoán sai với kết quả: ${results.map(res => res.split('/').pop().replace('.png', '')).join(', ')}`);
  }
  
  document.querySelectorAll('.bet-box').forEach((box, index) => {
    box.addEventListener('click', () => {
      if (spinning || bets.reduce((a, b) => a + b, 0) >= 3) return;
  
      bets[index]++;
      betPoints[index].innerText = bets[index];
    });
  });
  
  resetButton.addEventListener('click', () => {
    if (spinning) return;
  
    bets = [0, 0, 0, 0, 0, 0];
    betPoints.forEach(point => {
      point.innerText = '0';
    });
  });
  