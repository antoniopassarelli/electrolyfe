import i18n from '@/app/i18n';
import styles from './IntroSection.module.css';

export default function IntroSection() {
    return (
        <div className={styles.container}>
            <div className={styles.sectionWrapper1}>
                <h3 className={styles.subtitle}>{i18n.translate('intro.section1.title')}</h3>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section1.desc1')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section1.desc2')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section1.fluidBalance')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section1.muscleContractions')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section1.nerveImpulses')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section1.brainFunction')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section1.boneHealth')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section1.desc3')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section1.desc4')}</p>
            </div>

            <div className={styles.sectionWrapper2}>
                <h3 className={styles.subtitle}>{i18n.translate('intro.section2.title')}</h3>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.desc1')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section2.intenseExercise')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section2.hotEnvironments')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section2.fastingOrKeto')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section2.deficiencySigns')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.desc2')}</p>
                <p className={styles.subSubtitle}>{i18n.translate('intro.section2.depletionIndex.title')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.depletionIndex.intro')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.depletionIndex.desc')}</p>
                <p className={styles.subSubtitle}>{i18n.translate('intro.section2.depletionIndex.0')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.depletionIndex.at0')}</p>
                <p className={styles.subSubtitle}>{i18n.translate('intro.section2.depletionIndex.100')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section2.depletionIndex.at100')}</p>
            </div>

            <div className={styles.sectionWrapper3}>
                <h3 className={styles.subtitle}>{i18n.translate('intro.section3.title')}</h3>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.intro')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.stepsTitle')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step1.title')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step1.option1')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step1.option2')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.step1.desc')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step2.title')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.step2.intro')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step2.sodium')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step2.potassium')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step2.magnesium')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.step2.desc')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step3.title')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.step3.desc')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step4.title')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section3.step4.desc')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step5.title')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step5.step1')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step5.step2')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step5.step3')}</p>

                <p className={styles.stepTitle}>{i18n.translate('intro.section3.step6.title')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step6.step1')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step6.step2')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step6.step3')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step6.step4')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section3.step6.step5')}</p>
                <p className={`${styles.sectionParagraph} ${styles.italicNote}`}>
                    {i18n.translate('intro.section3.step6.note.part1')}
                </p>
                <p className={styles.sectionParagraph}>
                    {i18n.translate('intro.section3.step6.note.part2')}
                </p>
                <p className={styles.sectionParagraph}>
                    {i18n.translate('intro.section3.step6.note.part3')}
                </p>
                <p className={styles.sectionParagraph}>
                    {i18n.translate('intro.section3.step6.note.part4')}
                </p>
            </div>

            <div className={styles.sectionWrapper4}>
                <h3 className={styles.subtitle}>{i18n.translate('intro.section4.title')}</h3>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section4.morning')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section4.midMorning')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section4.hotEnvironments')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section4.storage')}</p>
            </div>

            <div className={styles.sectionWrapper5}>
                <h3 className={styles.subtitle}>{i18n.translate('intro.section5.title')}</h3>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section5.intro')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.scale')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.sodiumSource')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.potassiumSource')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.magnesiumSource')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.containers')}</p>
                <p className={styles.bullet}>{i18n.translate('intro.section5.flavorings')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section5.desc')}</p>
                <p className={styles.sectionParagraph}>{i18n.translate('intro.section5.outro')}</p>
            </div>
        </div>
    );
}
