import { ILevel } from './iLevel';

export class Level2 implements ILevel {
    public readonly input = [
        'bpacnmelhhzpygfsjoxtvkwuor',
        'biacnmelnizqygfsjoctvkwudr',
        'bpaccmllhizyygfsjoxtvkwudr',
        'rpacnmelhizqsufsjoxtvkwudr',
        'bfacnmelhizqygfsjoxtvwwudp',
        'bpacnmelhizqynfsjodtvkyudr',
        'bpafnmelhizqpgfsjjxtvkwudr',
        'bpackmelhizcygfsjoxtvkwudo',
        'bmacnmilhizqygfsjoltvkwudr',
        'bpafnmelhizuygfsjoxtvkwsdr',
        'boacnmylhizqygfsjoxtvxwudr',
        'bpbcjmelhizqygfsjoxtgkwudr',
        'bpacnmglhizqygfsjixtlkwudr',
        'bpacnmclhizqygfsjoxtvkwtqr',
        'bpacnmelhczqygtsjoptvkwudr',
        'bpacnmelhizqywfsaoxtvkbudr',
        'apacnmelhizqygcsjoxtvkwhdr',
        'bpacnmelrizqygfsbpxtvkwudr',
        'tpkcnmelpizqygfsjoxtvkwudr',
        'bpacnmelhizqlgfsjobtmkwudr',
        'npacnmelhizqygffjoxtvkwudf',
        'bpacnmeehqzqygqsjoxtvkwudr',
        'bpecnmelhizqigfsjvxtvkwudr',
        'bpacnmelhizqysfsjoxtvkdfdr',
        'bpacnfelhkzqygfsjoxtvkwfdr',
        'bpacnbelvizqygfsjoxthkwudr',
        'bpacnoelhizqygfejoxtvkwudn',
        'bpacnmelhizqygfzpkxtvkwudr',
        'bpahnmelhizqyufsjoxmvkwudr',
        'bpacnmelhizqygfsnoxtvkwmmr',
        'bpacnmelhizqygfsjoatvkludf',
        'bpacnmylhizqygfsjlxtvksudr',
        'bpacnmekhpzqygysjoxtvkwudr',
        'bpacnselhizqogfswoxtvkwudr',
        'bpacnmelhizqprfsjoxwvkwudr',
        'bpatnmelhinqygfsjoctvkwudr',
        'bpacnqelhqzqygfsxoxtvkwudr',
        'bpabnmelhiyqygfsjoxtykwudr',
        'bpacnivlhizqygfsjoxtviwudr',
        'bpkcnmylhizqygfsjoxtvkwcdr',
        'bpafnmflhizqygtsjoxtvkwudr',
        'bpachmelhizqygfsjixtvkwudg',
        'bpacymelhizqygfsjoxtykwuar',
        'bpacnkelhizqdgfsjoxtskwudr',
        'bpacnmezhizqggbsjoxtvkwudr',
        'bpacnmqlhizqygrsjoxzvkwudr',
        'bpaczmelhizqyhfsjoxfvkwudr',
        'bdacnmelhyzqygusjoxtvkwudr',
        'bpacbmelhizqywfsjostvkwudr',
        'bpacnmelhihzygfstoxtvkwudr',
        'bpactmelhizqygfsjcxtvkwydr',
        'bkacnmethizqytfsjoxtvkwudr',
        'bpacnmalhizqydfskoxtvkwudr',
        'spacnmelbizqygfsjoxdvkwudr',
        'lpalnmelhizoygfsjoxtvkwudr',
        'bpacjmeghizqygfsjoxtviwudr',
        'bpacnmeqhizxygfsjoxgvkwudr',
        'bpacnmelhizqygosjoxtvkkuhr',
        'bpacnmelhiznbxfsjoxtvkwudr',
        'bgacnmelhizqygfsjbxivkwudr',
        'bpacnmelhizqygfjjowtvswudr',
        'bpacnmelhizqygfsjovtgkmudr',
        'bpacnmelcmzqygfspoxtvkwudr',
        'bpvcnmelhizqyvfcjoxtvkwudr',
        'bpacnmeahizqjgfsjoxtvkwukr',
        'bpacnoelwizqygfsjoxtvkaudr',
        'xpacnmelhizqygfsjoxdvkwedr',
        'mpacnmelqizqygfsjoxtvkwudx',
        'bppcnmelhizqygfsjfxtvkhudr',
        'bpacnmclhizqyhfsjaxtvkwudr',
        'opacsmelhizqygfsjmxtvkwudr',
        'bpafnmelhizqjgfsjoxtvkrudr',
        'bpdcnmilhizqygfsjoxtvkludr',
        'bpainmelhizqygfsjtntvkwudr',
        'bradnmelhizqygfsjextvkwudr',
        'bpacnmelhizqygfmsoxtvkwudg',
        'bpacneelhizqygvrjoxtvkwudr',
        'bpacnpelhizqygfsjoxyvkwudf',
        'bpacnmelhizqygfsqoqtvkwodr',
        'bpacnmelhizjyghsjoxcvkwudr',
        'bpacnmelmibqygfsjoxtvnwudr',
        'jpacnmelaizqygfwjoxtvkwudr',
        'zpachmelhizqygfsjsxtvkwudr',
        'bpacnmelfizqykfsjomtvkwudr',
        'bpacnmllwizqygfsjoxtvkwusr',
        'bpaynmelhizqygfsjoxtvowcdr',
        'jpacnmqlhizqygfsjoxtvknudr',
        'bpacxmelhizqyffsjoxtvkwugr',
        'apawnmelhizqygfsjtxtvkwudr',
        'mpacnmelhitqigfsjoxtvkwudr',
        'bpacnmelhhzqygfsjoxtvkyzdr',
        'gpacnmelhizqynfsjoxtvkwudm',
        'bnacnkelhizqygfsjoxtpkwudr',
        'bpacnmelfizqygfsumxtvkwudr',
        'bpacnmelhisqygfsjohtvowudr',
        'bpacnmelhimqygxsjoxtvkwudn',
        'bpscnmeliizqygfsjoxtvkwunr',
        'qpacnmelhizqycfsjoxtvkwndr',
        'bpacnmelhijqygfsjohtvkyudr',
        'bpacnmelhizqykfsjkxtvknudr',
        'bpacnqilhizqygfsjoxtvkoudr',
        'bpacnmelhizqzgmsjoxtvkwurr',
        'bpdcnmelhizqygfsjoutukwudr',
        'bpecnmeghizqygfsjoxgvkwudr',
        'bpicnmelhizqygfrjoxtvlwudr',
        'bpacnmelhizfygfsroxtvkwodr',
        'buacnmelhizqygjsjoxtvkvudr',
        'bpacnmelhixqykfsjoxtvrwudr',
        'bpacnmelhizqygvejcxtvkwudr',
        'bpacnmjlhizqylfsjoxtvkwuor',
        'qpacnmelhizqygfsjoxfdkwudr',
        'bpfcnmemhizqygfsjoxtvknudr',
        'bpacnmelhizqoffsjqxtvkwudr',
        'hpacnielhiqqygfsjoxtvkwudr',
        'gpacnmelhizqygfsewxtvkwudr',
        'bpacnmellizqylxsjoxtvkwudr',
        'bpacnmenhizqymfsjoxtvkmudr',
        'bpacnfelhizqygcsjoltvkwudr',
        'bpacnmelhqqqygfsjoxtvkuudr',
        'bplgnmelhiqqygfsjoxtvkwudr',
        'bpacnzelhizqygfgjoxtvnwudr',
        'bpacnmelhizqygfsjoktvknunr',
        'bpacnmdlhioqygfnjoxtvkwudr',
        'epacnmelwizqyjfsjoxtvkwudr',
        'bpacxmelhazfygfsjoxtvkwudr',
        'bpacnmejhezqygfsjoxtskwudr',
        'bpacnqelhihqyzfsjoxtvkwudr',
        'bpacnbelhizqyrfsjoxtvkmudr',
        'bpacnmelhizqygfsjoxtylwzdr',
        'bpacnmelwizqygfsjodtvkhudr',
        'bpacnnelhizqygfsjoxtwkwadr',
        'bpacimelhizqygfsnoxtvkwuor',
        'bpacnmelhizqyaasjoxtlkwudr',
        'bpacnmelhizqyeffjoxtvkwuds',
        'bpacnmenhizqygxscoxtvkwudr',
        'bpacnmelhidqygfsjowtskwudr',
        'bpacnmeliizqygfsjoxhvkwucr',
        'bpacimelhizqygfsjoxtvktuwr',
        'bpainmelhhzqygfsjzxtvkwudr',
        'bpacamelhizqygfsjogtvkwbdr',
        'bpccnmelgizqygfsjoxtykwudr',
        'bpacnmelhizwegfsjoxtvkwadr',
        'bpackmelhbzqygqsjoxtvkwudr',
        'bpacymeihizqyffsjoxtvkwudr',
        'bpacnielhczqygfsjoxtvkwudk',
        'bpacnmejhizqygffjoxjvkwudr',
        'ppacnmelhizqygfsjoxtigwudr',
        'bpjcnmolhizqygfsjoxtvkwndr',
        'bpacnmelcizqygrsjoxtakwudr',
        'cpawnmelhizqygfsjoxmvkwudr',
        'bwacnmelhizqygesjoxtakwudr',
        'bpacnmelhizqygfsjexsvkwddr',
        'bpaunmelhiuqygfsjoxtvkwtdr',
        'bpacnmellimqygfsjextvkwudr',
        'bpacnmerhizqygfsaoxvvkwudr',
        'bpacnmglhizqygfsjixtukwudr',
        'ppacnmelhizqygfsjoxtvkdudp',
        'bpacnmedhizqygukjoxtvkwudr',
        'bpccnmelhizqngfsjoxtvkwadr',
        'bgacnmeldizqygfscoxtvkwudr',
        'bpacngelhizsygfsjoxtvkwkdr',
        'bpacnpelhizqygfsjoxctkwudr',
        'bpacnmylhizqygfcjoxtvkwmdr',
        'npacnmelhizqygfsjoxtwkwuds',
        'bpaxnmelhizqydfsjoxyvkwudr',
        'bpacnhelhizjygfsjoxtvkmudr',
        'bpacnkelhczqygfnjoxtvkwudr',
        'bfacnmelhizrygfsjoxtvkwodr',
        'bpycnmelhizqygfofoxtvkwudr',
        'qpacpselhizqygfsjoxtvkwudr',
        'bpvcnmelhezqygfsjoxttkwudr',
        'bpacnmwlhizqygfijoxtmkwudr',
        'bsacnmelhikqygfsjoxttkwudr',
        'bpccnxelhizqyafsjoxtvkwudr',
        'bpacnmelhizqygfswhxtvewudr',
        'vpacnmzlhizqygfsvoxtvkwudr',
        'bpacnmelhihqygfsjoxtvkqurr',
        'bpacnmelhixqygazjoxtvkwudr',
        'bpavnmelhizqygfsjozpvkwudr',
        'bpacnmclhizuygfsjoxmvkwudr',
        'bpacnmelhizryufsjoxtkkwudr',
        'bpacnmelhtzqygfsjobtvkwufr',
        'bpacnmelhizqmlfsjoxtvkwudq',
        'bpaaneelhizqygfsjlxtvkwudr',
        'bpacnmelhxzqygfsjoxthkwuhr',
        'bpacnmeshizqygfcjoxtvkwude',
        'bpacnzqlhizqygfsxoxtvkwudr',
        'bgaanmelhizqycfsjoxtvkwudr',
        'bpacnmexhizqygfsroxtvkwudn',
        'bpmmnmelhizqygfajoxtvkwudr',
        'bpacnmelhizqylfsjoxtckwhdr',
        'bpicnmelhizqyrfsjoxtvkwudi',
        'zpacnmelhizvycfsjoxtvkwudr',
        'bpamnmkllizqygfsjoxtvkwudr',
        'bpacnmelhrzqyrfsjoxgvkwudr',
        'bpadnmelhczqygfsjoxtlkwudr',
        'bpacrmelhizqygrsjoxtvkiudr',
        'lpacnmelhizqygfsjoxtgkwxdr',
        'fpacnmalhiuqygfsjoxtvkwudr',
        'bpacnmelhizqygfsjixtvfwcdr',
        'bpccnmelhxzqygfkjoxtvkwudr',
        'bpacnmepaizqygfsjoctvkwudr',
        'tpacnmelhivqygfsxoxtvkwudr',
        'kpacnfelhitqygfsjoxtvkwudr',
        'baacnzelhizqygfsjoxtvkwudx',
        'bcycnmeghizqygfsjoxtvkwudr',
        'wpacotelhizqygfsjoxtvkwudr',
        'bpacnmsshizqygrsjoxtvkwudr',
        'blacnmelhizqygfsjoxtykwvdr',
        'bkacnmelhizqygfsjoxuvkludr',
        'bpacnmelhizaugfsjoxtvhwudr',
        'fpavnmelhizqygfsgoxtvkwudr',
        'bpachmelnizqygfsjextvkwudr',
        'bpacnmelhizqpgfsjoxtvkwldu',
        'bpacnmelhizqygfsloftvywudr',
        'bpacntelhvzqygfejoxtvkwudr',
        'bpacnmeldizqygfsjmxtvkdudr',
        'byacnmelhizqygfsjsxtvkwudh',
        'bpacnmellizqygssxoxtvkwudr',
        'bpacnmelhizqygfsjootvknuir',
        'bpacnmelhitqjgfsjoxivkwudr',
        'bpacnmelhazaygfsjoxtvfwudr',
        'bpacnzenhizqygfsjzxtvkwudr',
        'bpacnmelhizqypfsdoxtvkwuar',
        'bpannmelhizqygnsjoxtvkwndr',
        'bracnmeldizsygfsjoxtvkwudr',
        'bpacnmelhizwygfsjugtvkwudr',
        'bpatnmelhizqygfsjoytvkwulr',
        'upacnmelhizqygfsjurtvkwudr',
        'bpaenmezhizqygfsjostvkwudr',
        'bpacnmelhizpygfsjodhvkwudr',
        'bpacnmelhizqygfsjogtvkguwr',
        'bpacnmelhisqygfsjoxtpkuudr',
        'bxacnmelhizqygfsjdxtvkfudr',
        'bpacnmelhizqygfsjohqvkwudu',
        'bzacnmtlhizqygfsjoxsvkwudr',
        'bpacnmplhixrygfsjoxtvkwudr',
        'bpacnmelhizqhgfsjomtvkwudg',
        'bpacnmezhizqygfsjxxtykwudr',
        'bpacnmwlhizqygfujoxtzkwudr',
        'tpacnmelhizqygfsjoxkvpwudr',
        'bpawsmenhizqygfsjoxtvkwudr',
        'bpacnmelhizqtgfsjoxttkwuqr',
        'bpkcbmelhizqygfsjoxtvkwucr',
        'bpacfmekhizqygfsjoxtvkwuds',
        'bpacnmethizqynfajoxtvkwudr',
        'bpocnmclhizqygfsjoxtvkwukr',
        'zpacnmwlhizqygfsjoxzvkwudr',
        'bpacpoelhqzqygfsjoxtvkwudr',
        'bpacnlelhizqyzfsjoxtvkwukr'
    ];

    public solve1(): string {
        let occursTwiceCount = 0;
        let occursThriceCount = 0;

        this.input.forEach(boxId => {
            const letterCollections = this.getLetterCounts(boxId);
            let addedToTwiceCount = false;
            let addedToThriceCount = false;

            letterCollections.forEach(lc => {
                if (lc.count === 2 && !addedToTwiceCount) {
                    occursTwiceCount++;
                    addedToTwiceCount = true;
                } else if (lc.count === 3 && !addedToThriceCount) {
                    occursThriceCount++;
                    addedToThriceCount = true;
                }
            });
        });

        return (occursTwiceCount * occursThriceCount).toString(10);
    }

    public solve2(): string {
        for (let i = 0; i < this.input.length; i++) {
            for (let j = i + 1; j < this.input.length; j++) {
                const charsInCommon = this.getCharsInCommon(
                    this.input[i],
                    this.input[j]
                );

                if (charsInCommon.length === this.input[i].length - 1) {
                    return charsInCommon;
                }
            }
        }

        return '';
    }

    private getLetterCounts(letters: string): LetterCount[] {
        const letterCollections: LetterCount[] = [];

        [...letters].forEach(letter => {
            let letterCountObj = letterCollections.find(
                lc => lc.letter === letter
            );

            if (!letterCountObj) {
                letterCountObj = new LetterCount();
                letterCountObj.letter = letter;
                letterCountObj.count = 1;
                letterCollections.push(letterCountObj);
            } else {
                letterCountObj.count++;
            }
        });

        return letterCollections;
    }

    private getCharsInCommon(a: string, b: string): string {
        const arrA = [...a];
        const arrB = [...b];
        let common = '';

        for (let i = 0; i < arrA.length; i++) {
            if (arrA[i] === arrB[i]) {
                common += arrA[i];
            }
        }

        return common;
    }
}

export class LetterCount {
    private _l: string;
    private _c: number;

    constructor() {
        this._l = '';
        this._c = 0;
    }

    get letter() {
        return this._l;
    }
    set letter(val) {
        this._l = val;
    }

    get count() {
        return this._c;
    }

    set count(val) {
        this._c = val;
    }
}

module.exports = Level2;
