const colors = [
  { name: "Cream", hex: "#FFFDD0", mode: "light" },
  { name: "Pastel Yellow", hex: "#FEF9A7", mode: "light" },
  { name: "Light Pink", hex: "#FFC0CB", mode: "light" },
  { name: "Peach", hex: "#FFDAB9", mode: "light" },
  { name: "Mint", hex: "#B5F2B5", mode: "light" },
  { name: "Sky Blue", hex: "#A7E0FF", mode: "light" },
  { name: "Lavender", hex: "#E5E0FF", mode: "light" },
  { name: "Beige", hex: "#F5F5DC", mode: "light" },
  { name: "Light Gray", hex: "#E0E0E0", mode: "light" },
  { name: "Aqua", hex: "#A0F0F0", mode: "light" },
  { name: "Midnight", hex: "#191970", mode: "dark" },
  { name: "Navy", hex: "#0A1931", mode: "dark" },
  { name: "Charcoal", hex: "#2F3542", mode: "dark" },
  { name: "Dark Red", hex: "#8B0000", mode: "dark" },
  { name: "Forest", hex: "#1B4D3E", mode: "dark" },
  { name: "Espresso", hex: "#4B2E2E", mode: "dark" },
  { name: "Dark Purple", hex: "#301934", mode: "dark" },
  { name: "Burgundy", hex: "#65000B", mode: "dark" },
  { name: "Olive Black", hex: "#3B3C36", mode: "dark" },
  { name: "Slate", hex: "#2C3E50", mode: "dark" },
  { name: "Ivory", hex: "#FFFFF0", mode: "light" },
  { name: "Snow", hex: "#FFFAFA", mode: "light" },
  { name: "Honeydew", hex: "#F0FFF0", mode: "light" },
  { name: "Lemon Chiffon", hex: "#FFFACD", mode: "light" },
  { name: "Misty Rose", hex: "#FFE4E1", mode: "light" },
  { name: "Powder Blue", hex: "#B0E0E6", mode: "light" },
  { name: "Pale Green", hex: "#98FB98", mode: "light" },
  { name: "Wheat", hex: "#F5DEB3", mode: "light" },
  { name: "Cornsilk", hex: "#FFF8DC", mode: "light" },
  { name: "Light Cyan", hex: "#E0FFFF", mode: "light" },
  { name: "Butter", hex: "#FFF4A3", mode: "light" },
  { name: "Lilac", hex: "#DCD0FF", mode: "light" },
  { name: "Baby Blue", hex: "#89CFF0", mode: "light" },
  { name: "Sand", hex: "#E6CCB2", mode: "light" },
  { name: "Blush", hex: "#FFB6C1", mode: "light" },
  { name: "Jet Black", hex: "#0A0A0A", mode: "dark" },
  { name: "Ink", hex: "#1A1A2E", mode: "dark" },
  { name: "Coal", hex: "#222831", mode: "dark" },
  { name: "Deep Brown", hex: "#3E2723", mode: "dark" },
  { name: "Chocolate", hex: "#3D1C02", mode: "dark" },
  { name: "Wine", hex: "#722F37", mode: "dark" },
  { name: "Mahogany", hex: "#4E0707", mode: "dark" },
  { name: "Pine", hex: "#0A2A1A", mode: "dark" },
  { name: "Deep Teal", hex: "#003B4D", mode: "dark" },
  { name: "Teal Black", hex: "#0B2027", mode: "dark" },
  { name: "Indigo", hex: "#2A1B4E", mode: "dark" },
  { name: "Maroon", hex: "#4C0013", mode: "dark" },
  { name: "Army", hex: "#4B5320", mode: "dark" },
  { name: "Dark Olive", hex: "#556B2F", mode: "dark" },
  { name: "Coffee", hex: "#4A3728", mode: "dark" }
];
let table = new Array(5).fill(null)
let locked = new Array(5).fill(false)


spaceKeydown()
generateBTN()
loadpage()
document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', loadpage)
})

function loadpage(){
  let colorMode = document.querySelector('input[name="mode"]:checked').value || 'all'
  let pHTML =  ``
  let picked = []
    table.forEach((old) => {
    if(old){
      picked.push(old)
    } //save the old table on picked if exists
   })
  table.forEach((pColor,i) => {
    if(!(locked[i] && table[i])){// do if not locked
      let x = pickRandomColor() 
      while(picked.includes(x) || (colorMode !== 'all' && x.mode !== colorMode)){
        x = pickRandomColor()
      }// do if x exists in picked or mode doesnt match with the user input
      picked.push(x) 
      table[i] = x 
    }
    pHTML +=  `
    <div class="${i}pallete ${table[i].mode}mode"
    style='background-color : ${table[i].hex}'>
      <div class="hidden">
        <div class='hex '>
          ${table[i].hex}        
        </div>
        <button class='unlock' data-index='${i}'>${locked[i] ? '🔒' : '🔓'}</button>
      </div>
      <p class='${i}pallete-name'>${table[i].name}</p> 
    </div>
    `
  })
  document.querySelector('.palettes').innerHTML = pHTML
  copyClick()
  lockPalette()
}
function pickRandomColor(){
  let randomNUM = Math.floor(Math.random()*colors.length)
  return colors[randomNUM]
}

function generateBTN(){
  document.querySelector('.generate-btn').addEventListener('click' , () => {
    loadpage()
  })
}

function spaceKeydown(){
  document.addEventListener('keydown' , (e) => {
    if(e.code == 'Space'){
      e.preventDefault()
      loadpage()
    }
  })
}
  
function copyClick(){
  document.querySelectorAll('.hex').forEach((dom) => {
    dom.addEventListener('click',() => { 
    let orginal = dom.textContent.trim()
    navigator.clipboard.writeText(orginal)
    dom.textContent = 'copied✓'
    setTimeout(() => {
      dom.textContent = orginal;
    }, 2000);
    })
  })
}

function lockPalette(){
  document.querySelectorAll('.unlock').forEach((btn) => {
    btn.addEventListener('click',() => {
      let i = btn.dataset.index
      locked[i] = !locked[i]
      btn.textContent = locked[i] ?  '🔒' : '🔓'
    })
  });
}
