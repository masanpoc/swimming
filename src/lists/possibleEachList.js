const possibleEachList = {
        25: {
            1: [[25]]
        },
        50: {
            1: [[50]],
            2: [[25,25]]
        },
        75: {
            1: [[75]],
            2: [[25, 50]],
            3: [[25,25,25]]
        },
        100: {
            1: [[100]],
            2: [[50,50]],
            3: [[25,25,50]],
            4: [[25,25,25,25]]
        },
        125: {
            1: [[125]],
            2: [[25, 100], [75, 50]],
            3: [[25,25,75], [50,50,25]],
            4: [[25,25,25,50]]
        },
        150: {
            1: [[150]],
            2: [[75,75], [100, 50]],
            3: [[50,50,50], [25,75,50]],
            4: [[25,25,50,50], [25,75,25,25]]
        },
        175: {
            1: [[175]],
            2: [[75,100], [125, 50]],
            3: [[50,50,75], [100,50,25]],
            4: [[50,25,50,50], [25,75,50,25]]
        },
        200: {
            1: [[200]], 
            2: [[100,100]],
            3: [[50, 50, 100]],
            4: [[50,50,50,50], [25,25,100,50]]
        },
        225: {
            1: [[225]],
            2: [[150, 75], [100, 125]],
            3: [[50,50,125], [100, 50, 75]],
            4: [[50,50,50,75], [25,75,75,50]]
        },
        250: {
            1: [[250]],
            2: [[150, 100], [125,125]],
            3: [[50,100,100], [50,50,150]],
            4: [[50,50,75,75], [50,50,50,100]]
        },
        275: {
            1: [[275]],
            2: [[150, 125], [100,175]],
            3: [[50,125,100], [50,75,150]],
            4: [[50,50,100,75], [50,50,75,100]]
        },
        300: {
            1: [[300]],
            2: [[100,200]],
            3: [[50,50,200],[100,100,100]],
            4: [[50,50,100,100]]
        },
        325: {
            1: [[325]],
            2: [[125,200]],
            3: [[75,100,150],[100,100,125]],
            4: [[50,75,100,100]]
        },
        350: {
            1: [[350]],
            2: [[150,200]],
            3: [[50,100,200],[100,100,150]],
            4: [[50,100,100,100]]
        },
        375: {
            1: [[375]],
            2: [[175,200]],
            3: [[100,75,200],[100,125,150]],
            4: [[75,100,100,100]]
        },
        400: {
            1: [[400]],
            2: [[200,200],[100,300]],
            3: [[100,100,200]],
            4: [[100,100,100,100], [50,100,50,200]]
        },
        425: {
            1: [[425]],
            2: [[225,200],[125,300]],
            3: [[100,125,200]],
            4: [[100,125,100,100], [75,100,50,200]]
        },
        450: {
            1: [[450]],
            2: [[250,200],[150,300]],
            3: [[100,150,200]],
            4: [[100,150,100,100], [100,100,50,200]]
        },
        475: {
            1: [[475]],
            2: [[225,250],[125,350]],
            3: [[100,125,250]],
            4: [[100,150,125,100], [100,100,75,200]]
        },
        500: {
            1: [[500]],
            2: [[200, 300], [100,400]],
            3: [[200,200,100], [100,100,300]],
            4: [[100,100,100,200],[50,200,200,50]]
        },
        525: {
            1: [[525]],
            2: [[225, 300], [125,400]],
            3: [[200,200,125], [125,100,300]],
            4: [[100,100,125,200],[75,200,200,50]]
        },
        550: {
            1: [[550]],
            2: [[250, 300], [150,400]],
            3: [[200,200,150], [100,150,300]],
            4: [[100,100,150,200],[100,200,200,50]]
        },
        575: {
            1: [[575]],
            2: [[275, 300], [175,400]],
            3: [[200,275,100], [100,175,300]],
            4: [[100,125,150,200],[100,200,200,75]]
        },
        600: {
            1: [[600]],
            2: [[300,300], [200,400]],
            3: [[200,200,200], [100,300,200]],
            4: [[100,100,100,300], [200,200,100,100]]
        },
        700: {
            1: [[700]],
            2: [[300,400], [200,500]],
            3: [[200,200,300], [300,300,100]],
            4: [[200,200,200,100], [100,100,300,200]]
        },
        800: {
            1: [[800]],
            2: [[400,400], [300,500]],
            3: [[300,300,200], [200,200,400]],
            4: [[200,200,200,200], [100,100,300,300]]
        },
        900: {
            1: [[900]],
            2: [[400,500], [300,600]],
            3: [[200,200,500], [300,300,300]],
            4: [[200,200,200,300], [300,300,100,200]]
        },
        1000: {
            1: [[1000]],
            2: [[500,500], [400,600]],
            3: [[300,300,400], [500,200,300]],
            4: [[200,200,300,300], [400,200,200,200]]
        },
        1100: {
            1: [[1100]],
            2: [[500,600], [400,700]],
            3: [[400,400,300], [300,300,500]],
            4: [[200,300,300,300], [400,300,200,200]]
        },
        1200: {
            1: [[1200]],
            2: [[500,700], [600,600]],
            3: [[400,400,400], [500,400,300]],
            4: [[300,300,300,300], [200,400,300,300]]
        },
        1300: {
            1: [[1300]],
            2: [[600,700], [500,800]],
            3: [[400,400,500], [300,600,400]],
            4: [[300,400,300,300], [400,400,200,300]]
        },
        1400: {
            1: [[1400]],
            2: [[600,800], [700,700]],
            3: [[500,400,500], [600,400,400]],
            4: [[300,300,500,300], [400,400,300,300]]
        },
        1500: {
            1: [[1500]],
            2: [[800,700], [600,900]],
            3: [[400,600,500], [500,500,500]],
            4: [[400,400,400,300], [500,300,400,300]]
        },
        1600: {
            1: [[1600]],
            2: [[700,900], [800,800]],
            3: [[600,600,400], [500,500,600]],
            4: [[400,400,400,400], [500,300,400,400]]
        },
        1700: {
            1: [[1700]],
            2: [[800,900], [1000,700]],
            3: [[600,600,500], [500,500,700]],
            4: [[400,400,400,500], [500,300,500,400]]
        },
        1800: {
            1: [[1800]],
            2: [[900,900], [800,1000]],
            3: [[600,600,600], [500,500,800]],
            4: [[500,500,400,400], [600,400,400,400]]
        },
        1900: {
            1: [[1900]],
            2: [[900,1000], [800,1100]],
            3: [[600,600,700], [500,600,800]],
            4: [[500,500,400,500], [600,600,400,300]]
        },
        2000: {
            1: [[2000]],
            2: [[1000,1000], [800,1200]],
            3: [[700,700,600], [600,800,600]],
            4: [[500,500,500,500], [600,400,600,400]]
        },
        2100: {
            1: [[2100]],
            2: [[1000,1100], [800,1300]],
            3: [[700,700,700], [600,900,600]],
            4: [[400,600,700,400], [600,400,600,500]]
        },
        2200: {
            1: [[2200]],
            2: [[1000,1200], [800,1400]],
            3: [[800,800,600], [1000,400,800]],
            4: [[600,600,600,400], [300,700,600,600]]
        },
        2300: {
            1: [[2300]],
            2: [[900,1400], [1000,1300]],
            3: [[500,1000,800], [400,800,1100]],
            4: [[600,600,600,500], [300,800,600,600]]
        },
        2400: {
            1: [[2400]],
            2: [[800,1600], [1200,1200]],
            3: [[400,1000,1000], [500,800,1100]],
            4: [[700,700,300,700], [800,800,400,400]]
        },
        2500: {
            1: [[2500]],
            2: [[1000,1500], [1200,1300]],
            3: [[500,1000,1000], [500,800,1200]],
            4: [[700,800,400,800], [800,900,300,500]]
        }
}

export default possibleEachList 