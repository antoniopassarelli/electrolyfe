import Container from '@/app/components/Container/Container';
import useIngredientContext from '@/app/Context/useIngredientContext';
import TopBanner from '@/app/components/Calculator/TopBanner';
import Calculator from '@/app/components/Calculator/Calculator';

export default function CalculatorPage() {
    const { isBannerVisible } = useIngredientContext();

    return (
        <Container>
            {isBannerVisible && <TopBanner />}
            <Calculator />
        </Container>
    );
}
