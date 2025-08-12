

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== listener);
    }
  }


  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(...args));
    }
  }
}


const timeEmitter = new EventEmitter();
let greetingText = "";
let greetInterval;

const output = document.getElementById("greeting");
timeEmitter.on('tick', (time) => {
  output.textContent += `Time: ${time}\n`;
});

setInterval(() => {
  const now = new Date().toLocaleTimeString();
  timeEmitter.emit('tick', now);
}, 1000);

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" : "Good Night";
}

function updateGreeting(msg) {
  output.textContent += `${msg}\n`;
}

function subscribe() {
  timeEmitter.on("greet", updateGreeting);
  greetInterval = setInterval(() => {
    timeEmitter.emit("greet", getGreeting());
  }, 3000);
}

function unsubscribe() {
  timeEmitter.off("greet", updateGreeting);
  clearInterval(greetInterval);
  greetingText = "";
}
