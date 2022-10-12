function myFn () {
  console.log(this)
}

//myFn()

const newFn = () => {
  console.log(this)
}

newFn()

