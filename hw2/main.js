const allalbum = document.getElementById('allAlbum')
const displaypic = document.getElementById('displaypic')
const albumtitle = document.getElementsByClassName('albumtitle')
const album = [
    {
        name: '皮卡丘',
        url: ['https://p6.pstatp.com/origin/pgc-image/4e0fc34ea6834e92a8d8d712f417f735',
            'https://game.portal-pokemon.com/sword_shield_expansion/tc/news/img/news-img-v8-5.png',
            'https://i1.zi.org.tw/applealmond/2019/05/12170341/1557651820-06469d435ce2caad28016defba140d07.jpg',
            'https://cdn1.techbang.com/system/excerpt_images/48113/special_headline/5fb46b0dc020166fad9203d5ebb73313.png?1481614924'
        ]
    },
    {
        name: '傑尼龜',
        url: ['https://cdn2.ettoday.net/images/278/278683.jpg',
            'data:image/jpeg;base64,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',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eyXhgf5YlOP7x11mKrDOJUgKj2gmFm3qeg&usqp=CAU',
            'https://memeprod.ap-south-1.linodeobjects.com/user-template/735b2ef0b66ac869182d83d104754142.png'
        ]
    },
    {
        name: '妙蛙種子',
        url: ['https://lh3.googleusercontent.com/proxy/5lfmxxDWDw0GiJ7XNnyYKNT8oQxeHHzQwtOwKbN441ki25N3-gyPAWcXZDKyBAUlahcRBJZZ8X6MVvHJBF6J3lTvKp8SvwyP-SnihVJ5OXzaNaPOFRL3',
            'https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cf47f9fac4ed3037ff2a8ea83204e32aff8fb5f3.png',
            'http://i1.wp.com/inews.gtimg.com/newsapp_bt/0/2155608430/641',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVadFgX2iZy7_BS1ws0613eYt5pkgYMY5HddY3eOBsP2bQvAWsZAopP-Srhz5D5f3NghU&usqp=CAU'

        ]
    },
    {
        name: '小火龍',
        url: ['https://pic.pimg.tw/anny2949/1475488652-2391685017.jpg',
            'http://5b0988e595225.cdn.sohucs.com/images/20190406/11b67a247be6478c92a65e4ed0edcaa4.jpeg',
            'https://cdn1.wishnote.tw/500/2016/07/18/500_518126_1468827628.gif',
            'https://i02piccdn.sogoucdn.com/51ed6560dc824ba2'
        ]
    },
    {
        name: '空相簿',
        url: []
    }
]
const pics = document.getElementsByClassName('albumpic')
const last_bt = document.getElementById('b_bt')
const next_bt = document.getElementById('a_bt')
let index_album = 0;
let index_number = 0;



window.addEventListener('load', function () { render(); addEvent(); })

function addEvent() {

    //上一張按鈕
    last_bt.addEventListener("click", function () {
        if (index_number === 0) {
            index_number = album[index_album].url.length;
        }
        displaypic.style.backgroundImage = 'url(' + album[index_album].url[(--index_number) % 4] + ')';
        for (let index = 0; index < pics.length; index++) {
            console.log(pics[index].style.border);
            pics[index].style.border = 'none';
        }
        pics[trans(index_album, index_number)].style.border = '5px solid red'
        for (let q = 0; q < album.length; q++) {
            albumtitle[q].style.background = '#7a6b6b';
        }
        albumtitle[index_album].style.background = 'red';
    })

    //下一張按鈕
    next_bt.addEventListener("click", function () {
        index_number = (++index_number) % album[index_album].url.length;
        displaypic.style.backgroundImage = 'url(' + album[index_album].url[index_number] + ')';
        for (let index = 0; index < pics.length; index++) {
            pics[index].style.border = 'none';
        }

        pics[trans(index_album, index_number)].style.border = '5px solid red'
        for (let q = 0; q < album.length; q++) {
            albumtitle[q].style.background = '#7a6b6b';
        }
        albumtitle[index_album].style.background = 'red';
    })

    //點擊下方圖片
    let k = 0;
    for (let i = 0; i < album.length; ++i) {
        for (let j = 0; j < album[i].url.length; j++) {
            pics[k].addEventListener("click", function () {
                displaypic.style = `background-image: url('${album[i].url[j]}');`
                for (let index = 0; index < pics.length; index++) {
                    pics[index].style.border = 'none';
                }
                this.style.border = '5px solid red';
                index_album = i;
                index_number = j;
                for (let q = 0; q < album.length; q++) {
                    albumtitle[q].style.background = '#7a6b6b';
                }
                albumtitle[index_album].style.background = 'red';
            })
            ++k;
        }
    }

    //點擊相簿標題
    for (let i = 0; i < album.length; i++) {
        albumtitle[i].addEventListener("click", function () {
            if (album[i].url.length != 0) {
                console.log('___________________');
                console.log('hi albumtitle' + i);
                displaypic.style = `background-image: url('${album[i].url[0]}');`
                for (let index = 0; index < pics.length; index++) {
                    pics[index].style.border = 'none';
                }
                index_album = i;
                index_number = 0;
                pics[trans(i, 0)].style.border = '5px solid red';


                for (let q = 0; q < album.length; q++) {
                    albumtitle[q].style.background = '#7a6b6b';
                }
                albumtitle[index_album].style.background = 'red';
            }
            else {
                alert('empty!這是空的!');
            }
        })
    }

}


function render() {
    // let albumStr = ''
    // for (let index = 0; index < album.length; index++) {
    //     albumStr = albumStr +
    //         `
    //     <div id="${index}" class="album">
    //     <div class="albumtitle"><a href="">${album[index].name}</a></div>
    //     <div class="albumpics">
    //     `
    //     for (let index2 = 0; index2 < album[index].url.length; index2++) {

    //         albumStr = albumStr + `
    //         <div class="albumpic" style = "background-image: url('${album[index].url[index2]}');" ></div>
    //         `
    //     }
    //     albumStr = albumStr +
    //         `
    //     </div > 
    //         <div class="more"><a href=""> more > </a></div>
    //     </div >            `
    // }
    // allalbum.innerHTML = albumStr

    for (let i = 0; i < album.length; ++i) {
        let category = document.createElement("div");
        category.id = `${i}`
        category.classList.add("album")
        category.innerHTML += `<div class="albumtitle"><a href="">${album[i].name}</a></div>`

        let albumpics = document.createElement("div");
        albumpics.classList.add("albumpics")
        for (let j = 0; j < album[i].url.length; j++) {
            let albumpic = document.createElement("div");
            albumpic.classList.add("albumpic")
            albumpic.style = `background-image: url('${album[i].url[j]}');`
            albumpics.appendChild(albumpic);
        }
        category.appendChild(albumpics);
        category.innerHTML += `<div class="more"><a href=""> more > </a></div>`
        allalbum.appendChild(category)
    }
}

function trans(i, j) {
    let k = 0;
    flag = 0;
    for (let i = 0; i < album.length; ++i) {
        if (flag != 0) { break; }
        for (let j = 0; j < album[i].url.length; j++) {
            if (i === index_album && j === index_number) {
                flag = 1;
                break;
            }
            k++;
        }
    }
    console.log('k =' + k);
    return k;
}