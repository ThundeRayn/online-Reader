

const AboutPanel = () => {
  return (
    <div>
      <div style={{ marginTop: '1.5rem', padding: '0 1rem' }}>
        <div style={{ 
          color: 'var(--theme-text)', 
          fontSize: 'calc(var(--reading-text-size) * 0.9)',
          lineHeight: '1.8',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            fontSize: 'calc(var(--reading-text-size) * 1.2)', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            版权声明
          </h3>
          
<p style={{ marginBottom: '0.8rem' }}>
  <strong>原作版权说明：</strong>
  《忒拜之战》（<em>Thebaid</em>）为古罗马诗人斯塔提乌斯（Publius Papinius Statius，约公元 45–96 年）所著的拉丁文史诗作品。
  该作品完成于公元 1 世纪，依据现行国际版权法及相关著作权法规，其原文已进入公有领域。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>原文参考来源：</strong>
  本译文在创作过程中参考了多种公开可获取的学术文本版本，仅作为文本校对、语义理解与学术比对之用，
  并不构成对任何单一版本的复制或替代。主要参考来源包括：
  <br />
  · 英文文本与译文参考：
  <a className="underline" href="https://topostext.org/work/149" target="_blank" rel="noopener noreferrer">
    Loeb Classical Library, John Henry Mozley
  </a>
  <br />
  · 拉丁文原文：
  <a className="underline" href="https://www.perseus.tufts.edu/hopper/text?doc=urn:cts:latinLit:phi1020.phi001.perseus-lat1" target="_blank" rel="noopener noreferrer">
    Perseus Digital Library, Tufts University
  </a>
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>译文版权声明：</strong>
  本站所展示的全部中文译文，系译者唐诗榕、肖翔尹独立完成，
  属于对公有领域作品的原创翻译成果。译文内容依法受著作权法保护，译文版权归译者本人共同所有。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>合理引用与创作使用许可：</strong>
  在不涉及任何商业用途的前提下，本站允许他人在其原创作品中对本站译文进行合理引用，
  包括但不限于绘画、插画、视觉创作、同人作品、娱乐性创作、评论或个人展示等形式。
  引用内容应为节选性质，不得构成对译文整体或任一章节的实质性替代。
  对于研究、评论、教学等较为正式的使用场景，建议注明译者姓名及本站来源；
  对于纯娱乐或轻量创作场景，不作强制署名要求，但欢迎标注来源以示尊重。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>使用与转载限制：</strong>
  未经译者事先书面授权，任何组织或个人不得以任何形式对本站译文进行整篇转载、
  系统性收录、镜像发布、批量复制、改编为可替代原译文的文本，
  或用于出版、发行、汇编、付费内容平台、商业网站及其他营利性或半营利性用途。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>明确禁止事项：</strong>
  本站译文不得被用于纸质或电子出版物、数据库产品、内容聚合平台、
  AI 训练数据集或自动化文本生成系统中，
  上述行为均不视为合理使用，译者保留依法追究相关责任的权利。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>引用与学术规范：</strong>
  如在学术研究、教学或非商业写作中引用本站译文，
  请遵循学术诚信原则，准确标注译者姓名及来源，
  不得断章取义、歪曲原意或隐去译者署名。
</p>

<p style={{ marginBottom: '0.8rem' }}>
  <strong>免责声明：</strong>
  本站译文仅代表译者基于语言理解、文学判断与个人研究所作的诠释，
  不代表任何学术机构、出版社或权威观点。
  译文中如有疏漏或可商榷之处，欢迎理性指正与交流讨论。
</p>

          
          <p style={{ 
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: 'calc(var(--reading-text-size) * 0.8)',
            opacity: 0.7
          }}>
            © 2026 唐诗榕、肖翔尹 译<br/>
            本站由 Shirong 技术支持
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPanel
