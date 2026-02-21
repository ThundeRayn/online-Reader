import Anchor from "../components/Anchor"
import Citation from "../components/Citation"
import Elaboration from "../components/Elaboration"
import Comments from "../blocks/comments/Comments"

const Para1303 = () => {
  return (
    <Comments paragraphId="para1303">
      <div>
        <div className="leading-relaxed" style={{ fontSize: 'var(--reading-text-size)', lineHeight: 'var(--reading-line-height)' }}>
        <Anchor series="§ 1.303"/>

        {/*waiting to be done*/}
        {/* <Elaboration note="note" text="text"/> */}
        {/* <Elaboration text="text"/> */}
        {/*<Citation></Citation>*/}
        {/*<Citation extranote="text"></Citation>*/}

        顺从那年长父亲的命令，<Citation>阿特拉斯</Citation>之孙<Elaboration text="指赫尔墨斯"/>立刻将金色的有翼之履系于脚踝，又把飘散的头发藏到宽檐旅行帽下面，遮住自己头上那如苍穹群星的灿亮光辉。随后他以右手执起那根权杖——他常用它驱散甜美的睡意，或用它再把灵魂召回；这杖还可令他出入阴郁塔尔塔洛斯，进入冥河的黑夜，或从斯提克斯河的黑暗中重返光明。于是他纵身而下，滑入空旷的天际，把自己交给那缕微风，任凭松开的风缰载他飞行。
        &nbsp;
        
    </div>
      </div>
    </Comments>
  )
}

export default Para1303