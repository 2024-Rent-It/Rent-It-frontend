import tentImage from '../../../assets/images/tent.jpg';
import rollerImage from '../../../assets/images/roller.jpg';
import bookshelfImage from '../../../assets/images/bookshelf.jpg';
import golfdressImage from '../../../assets/images/golfdress.jpg';
import hairbandImage from '../../../assets/images/hairband.jpeg';
import iphoneImage from '../../../assets/images/iphone.jpg';
import purifierImage from '../../../assets/images/purifier.jpg';
import toolsImage from '../../../assets/images/tools.png';
import airdressImage from '../../../assets/images/airdress.jpeg';
import cattowerImage from '../../../assets/images/cattower.jpg';
import coatImage from '../../../assets/images/coat.jpg';
import dogwearImage from '../../../assets/images/dogwear.jpeg';
import ladyImage from '../../../assets/images/lady.png';
import plateImage from '../../../assets/images/plate.jpg';
import macbook from '../../../assets/images/macbook.jpg';

const products = [
  { 
    id: 1, 
    title: "텐트", 
    goodsName: "Tent", 
    user: "나는 문어", 
    Address: "강남구 대치동", 
    pictures: tentImage, 
    description: "텐트입니다.", 
    price: "3만원" 
  },
  { 
    id: 2, 
    title: "폼롤러", 
    goodsName: "Roller", 
    user: "케로로", 
    Address: "경기도 양평군", 
    pictures: rollerImage, 
    description: "폼롤러입니다. 3번만 썼어요.", 
    price: "3천원" 
  },
  { 
    id: 3, 
    title: "책장", 
    goodsName: "Bookshelf", 
    user: "별이빛나는밤", 
    Address: "원주시 흥업면", 
    pictures: bookshelfImage, 
    description: "책장입니다.", 
    price: "2만원" 
  },
  { 
    id: 4, 
    title: "골프복", 
    goodsName: "Golfdress", 
    user: "홍해인", 
    Address: "강남구 대치동", 
    pictures: golfdressImage, 
    description: "골프복입니다. 위아래 셋트 가격이에요~", 
    price: "2만원" 
  },
  { 
    id: 5, 
    title: "머리끈", 
    goodsName: "Hairband", 
    user: "밥버거", 
    Address: "강남구 대치동", 
    pictures: hairbandImage, 
    description: "루이비통 머리끈이에요~", 
    price: "2천원" 
  },
  { 
    id: 6, 
    title: "아이폰", 
    goodsName: "Iphone", 
    user: "배고픈 오리", 
    Address: "강남구 대치동", 
    pictures: iphoneImage, 
    description: "아이폰 14입니당 빌려가세요", 
    price: "만원" 
  },
  { 
    id: 7, 
    title: "공기청정기", 
    goodsName: "Purifier", 
    user: "타코", 
    Address: "강남구 대치동", 
    pictures: purifierImage, 
    description: "공기청정기 아주 성능 좋아요 집에 3개라 하나는 대여해드려요!!", 
    price: "2만원" 
  },
  { 
    id: 8, 
    title: "공구", 
    goodsName: "Tools", 
    user: "쥬블레스오블리쥬", 
    Address: "강남구 대치동", 
    pictures: toolsImage, 
    description: "돈 내고 사기 아까운 공구 공유합니다. 가까운 거리는 직접 가져다 드릴게요. 연락주세요.", 
    price: "8천원" 
  },
  { 
    id: 9, 
    title: "에어드레서", 
    goodsName: "Airdress", 
    user: "잠만보", 
    Address: "강남구 대치동", 
    pictures: airdressImage, 
    description: "에어드레서 빌려드릴게요. 깨끗하게만 사용하신다면 기간은 크게 상관 없습니다!", 
    price: "만원" 
  },
  { 
    id: 10, 
    title: "캣타워", 
    goodsName: "Cat Tower", 
    user: "대마법사", 
    Address: "강남구 대치동", 
    pictures: cattowerImage, 
    description: "캣타워를 새로 장만하게 돼서 하나 내놓습니당 ㅎㅎ 고양이들이 넘 좋아해요~!! 직접 보고 결정하셔도 됩니닷", 
    price: "3천원" 
  },
  { 
    id: 11, 
    title: "코트", 
    goodsName: "Coat", 
    user: "코덕", 
    Address: "강남구 대치동", 
    pictures: coatImage, 
    description: "안 입는 코트 렌트해드려요~ 비싼 코트라 어디에 입고 가셔도 좋을 거예요. 55~66 초반까지 가능합니다.", 
    price: "만원" 
  },
  { 
    id: 12, 
    title: "강아지옷", 
    goodsName: "Dog Wear", 
    user: "교수님미워잉", 
    Address: "강남구 대치동", 
    pictures: dogwearImage, 
    description: "강아지옷을 너무 많이 모아서 공유해드리려고요!! 소형 강아지들 따숩게 옷 입혀주세요옹", 
    price: "3천원" 
  },
  { 
    id: 13, 
    title: "디올 가방", 
    goodsName: "Lady", 
    user: "왕돼지", 
    Address: "강남구 대치동", 
    pictures: ladyImage, 
    description: "디올 가방 렌트해드릴게요~ 사정상 길게는 못해드리고 한 달 정도 가능합니다.", 
    price: "5만원" 
  },
  { 
    id: 14, 
    title: "손님용 그릇", 
    goodsName: "Plate", 
    user: "쩝쩝박사", 
    Address: "강남구 대치동", 
    pictures: plateImage, 
    description: "예쁜 손님용 그릇 사기 아까우니까 빌려가세요!! 쿠키 같은 거 올리면 반응이 너무 좋았어요 ㅎㅎㅎ", 
    price: "2천원" 
  },
  { 
    id: 15, 
    title: "맥북", 
    goodsName: "macbook", 
    user: "부자될래", 
    Address: "강남구 대치동", 
    pictures: macbook, 
    description: "맥북 대여해드릴 수 있습니다. 기간은 연락 주시면 같이 조율하면 될 거 같아요.", 
    price: "3만원" 
  }
];

export default products;