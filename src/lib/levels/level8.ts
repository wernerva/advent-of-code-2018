import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level8 extends LevelBase implements ILevel {
    public readonly input: number[];

    constructor() {
        super();

        const inputStr = super.readInput('../input/day8.txt')[0];
        // const inputStr = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

        this.input = [...inputStr.split(' ')].map(i => parseInt(i, 10));
    }

    public solve1(): string {
        const sum = this.calculateValue();

        return sum.toString();
    }

    public solve2(): string {
        const valueCalcFn = function(node: Node): number {
            let total = 0;

            if (!node.children || node.children.length === 0) {
                node.metaEntries.forEach(me => (total += me));
            } else {
                node.metaEntries.forEach(me => {
                    const idx = me - 1;

                    if (idx > -1 && idx < node.children.length) {
                        total += node.children[idx].value;
                    }
                });
            }

            return total;
        };

        const sum = this.calculateValue(valueCalcFn);

        return sum.toString();
    }

    private calculateValue(valueCalcFn?: (node: Node) => number): number {
        const nodes = this.parseNodes(valueCalcFn);
        let sum = 0;

        nodes.forEach(n => (sum = n.value));

        return sum;
    }

    private parseNodes(valueCalcFn?: (node: Node) => number): Node[] {
        const nodes: Node[] = [];
        const inputLength = this.input.length - 1;
        let nodeData: { node: Node; metaEndIdx: number };
        let endIdx = 0;

        while (endIdx < inputLength) {
            nodeData = this.inputToNodeData(0, valueCalcFn);
            endIdx = nodeData.metaEndIdx;

            nodes.push(nodeData.node);
        }

        return nodes;
    }

    private inputToNodeData(
        startIdx: number,
        valueCalcFn?: (node: Node) => number
    ): { node: Node; metaEndIdx: number } {
        const headerEndIdx = startIdx + 1;
        let metaStartIdx = startIdx + 2;
        const header = this.input.slice(startIdx, metaStartIdx);
        const node = new Node();
        let childNodeData: { node: Node; metaEndIdx: number };
        let metaEndIdx = 0;

        if (valueCalcFn) {
            node.valueCalcFn = valueCalcFn;
        }

        console.log(`startIdx: ${startIdx}; endIdx: ${headerEndIdx}, header: [${header.join(', ')}]`);

        if (header[0] === 0) {
            metaEndIdx = metaStartIdx + header[1] - 1;
            node.metaEntries = this.input.slice(metaStartIdx, metaEndIdx + 1);
        } else {
            for (let i = 0; i < header[0]; i++) {
                childNodeData = this.inputToNodeData(metaStartIdx, valueCalcFn);
                node.children.push(childNodeData.node);
                metaStartIdx = childNodeData.metaEndIdx + 1;
            }

            metaEndIdx = metaStartIdx + header[1] - 1;

            node.metaEntries = this.input.slice(metaStartIdx, metaEndIdx + 1);
        }

        return { node: node, metaEndIdx: metaEndIdx };
    }
}

export class Node {
    public metaEntries: number[];
    public children: Node[];
    public valueCalcFn: (node: Node) => number;

    private defaultValueCalc = function(node: Node): number {
        let sum = 0;

        if (node.metaEntries && node.metaEntries.length > 0) {
            node.metaEntries.forEach(me => (sum += me));
        }

        if (node.children && node.children.length > 0) {
            node.children.forEach(cn => (sum += cn.value));
        }

        return sum;
    };

    constructor() {
        this.metaEntries = [];
        this.children = [];
        this.valueCalcFn = this.defaultValueCalc;
    }

    public get value(): number {
        return this.valueCalcFn(this);
    }
}
